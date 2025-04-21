import { type LitElement } from "lit";
import isSsr from "../is-ssr.ts";
import SystemError from "../SystemError.ts";
import type { MixinBase, MixinReturn } from "./types";
import type { ConstraintValidation } from "./with-constraint-validation";
import {
  internals,
  type WithElementInternals,
} from "./with-element-internals.ts";

/**
 * A symbol property used for a callback when validity has been reported.
 */
export const onReportValidity = Symbol("onReportValidity");

export interface OnReportValidity extends ConstraintValidation {
  /**
   * A callback that is invoked when validity should be reported. Components
   * that can display their own error state can use this and update their
   * styles.
   *
   * If an invalid event is provided, the element is invalid. If `null`, the
   * element is valid.
   *
   * The invalid event's `preventDefault()` may be called to stop the platform
   * popup from displaying.
   *
   * @param invalidEvent The `invalid` event dispatched when an element is
   * invalid, or `null` if the element is valid.
   */
  [onReportValidity](invalidEvent: Event | null): void;

  // `withOnReportValidity()` implements this optional method. If overriden,
  // call `super.formAssociatedCallback(form)`.
  formAssociatedCallback(form: HTMLFormElement | null): void;
}

/**
 * Checks if a control is the first invalid control in a form.
 *
 * @param form The control's form. When `null`, the control doesn't have a form
 *     and the method returns true.
 * @param control The control to check.
 * @return True if there is no form or if the control is the form's first
 *     invalid control.
 */
const isFirstInvalidControlInForm = (
  form: HTMLFormElement | null,
  control: HTMLElement,
) => {
  if (!form) return true;

  let firstInvalidControl: Element | undefined;

  for (const element of form.elements) {
    if (element.matches(":invalid")) {
      firstInvalidControl = element;

      break;
    }
  }

  return firstInvalidControl === control;
};

const FORM_VALIDATE_HOOKS = new WeakMap<HTMLFormElement, EventTarget>();

/**
 * Get a hooks `EventTarget` that dispatches 'before' and 'after' events that
 * fire before a form runs constraint validation and immediately after it
 * finishes running constraint validation on its controls.
 *
 * This happens during `form.reportValidity()` and `form.requestSubmit()`.
 *
 * @param form The form to get or set up hooks for.
 */
const getFormValidateHooks = (form: HTMLFormElement) => {
  if (!FORM_VALIDATE_HOOKS.has(form)) {
    // Patch form methods to add event listener hooks. These are needed to react
    // to form behaviors that do not dispatch events, such as a form asking its
    // controls to report their validity.
    //
    // We should only patch the methods once, since multiple controls and other
    // forces may want to patch this method. We cannot reliably clean it up if
    // there are multiple patched and re-patched methods referring holding
    // references to each other.
    //
    // Instead, we never clean up the patch but add and clean up event listeners
    // added to the hooks after the patch.
    const hooks = new EventTarget();

    FORM_VALIDATE_HOOKS.set(form, hooks);

    // Add hooks to support notifying before and after a form has run constraint
    // validation on its controls.
    // Note: `form.submit()` does not run constraint validation per spec.
    for (const methodName of ["reportValidity", "requestSubmit"] as const) {
      const superMethod = form[methodName];

      form[methodName] = function (this: HTMLFormElement) {
        hooks.dispatchEvent(new Event("before"));

        // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-unsafe-assignment
        const result = Reflect.apply(superMethod, this, arguments);

        hooks.dispatchEvent(new Event("after"));

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
      };
    }
  }

  return FORM_VALIDATE_HOOKS.get(form)!;
};

/**
 * Add a listener that fires when a form runs constraint validation on a control
 * and it is valid. This is needed to clear previously invalid styles.
 *
 * @param control The control of the form to listen for valid events.
 * @param form The control's form that can run constraint validation.
 * @param onControlValid A listener that is called when the form runs constraint
 *     validation and the control is valid.
 * @param cleanup A cleanup signal to remove the listener.
 */
const addFormReportValidListener = (
  control: Element,
  form: HTMLFormElement,
  onControlValid: () => void,
  cleanup: AbortSignal,
) => {
  const validateHooks = getFormValidateHooks(form);

  // When a form validates its controls, check if an invalid event is dispatched
  // on the control. If it is not, then inform the control to report its valid
  // state.
  let controlFiredInvalid = false;
  let cleanupInvalidListener: AbortController | undefined;
  let isNextSubmitFromHook = false;

  validateHooks.addEventListener(
    "before",
    () => {
      isNextSubmitFromHook = true;
      cleanupInvalidListener = new AbortController();
      controlFiredInvalid = false;
      control.addEventListener(
        "invalid",
        () => {
          controlFiredInvalid = true;
        },
        {
          signal: cleanupInvalidListener.signal,
        },
      );
    },
    { signal: cleanup },
  );

  validateHooks.addEventListener(
    "after",
    () => {
      isNextSubmitFromHook = false;
      cleanupInvalidListener?.abort();

      if (controlFiredInvalid) return;

      onControlValid();
    },
    { signal: cleanup },
  );

  // The above hooks handle imperatively submitting the form, but not
  // declaratively submitting the form. This happens when:
  // 1. A non-custom element `<button type="submit">` is clicked.
  // 2. Enter is pressed on a non-custom element text editable `<input>`.
  form.addEventListener(
    "submit",
    () => {
      // This submit was from `form.requestSubmit()`, which already calls the
      // listener.
      if (isNextSubmitFromHook) return;

      onControlValid();
    },
    { signal: cleanup },
  );

  // Note: it is a known limitation that we cannot detect if a form tries to
  // submit declaratively, but fails to do so because an unrelated sibling
  // control failed its constraint validation.
  //
  // Since we cannot detect when that happens, a previously invalid control may
  // not clear its error styling when it becomes valid again.
  //
  // To work around this, call `form.reportValidity()` when submitting a form
  // declaratively. This can be down on the `<button type="submit">`'s click or
  // the text editable `<input>`'s 'Enter' keydown.
};

/**
 * Mixes in a callback for constraint validation when validity should be
 * styled and reported to the user.
 *
 * This is commonly used in text-field-like controls that display error styles
 * and error messages.
 *
 * @example
 * ```ts
 * const baseClass = withOnReportValidity(
 *   withConstraintValidation(
 *     withFormAssociated(withElementInternals(LitElement)),
 *   ),
 * );
 *
 * class MyField extends baseClass {
 *   \@property({type: Boolean}) error = false;
 *   \@property() errorMessage = '';
 *
 *   [onReportValidity](invalidEvent: Event | null) {
 *     this.error = !!invalidEvent;
 *     this.errorMessage = this.validationMessage;
 *
 *     // Optionally prevent platform popup from displaying
 *     invalidEvent?.preventDefault();
 *   }
 * }
 * ```
 *
 * @param base The class to mix functionality into.
 */
const withOnReportValidity = <
  T extends MixinBase<LitElement & ConstraintValidation & WithElementInternals>,
>(
  base: T,
): MixinReturn<T, OnReportValidity> => {
  abstract class WithOnReportValidity extends base implements OnReportValidity {
    private _cleanupFormListeners = new AbortController();

    private _doNotReportInvalid = false;
    private _isSelfReportingValidity = false;

    // Mixins must have a constructor with `...args: any[]`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super(...args);

      if (isSsr()) return;

      this.addEventListener(
        "invalid",
        invalidEvent => {
          // Listen for invalid events dispatched by a `<form>` when it tries to
          // submit and the element is invalid. We ignore events dispatched when
          // calling `checkValidity()` as well as untrusted events, since the
          // `reportValidity()` and `<form>`-dispatched events are always
          // trusted.
          if (this._doNotReportInvalid || !invalidEvent.isTrusted) {
            return;
          }

          this.addEventListener(
            "invalid",
            () => {
              // A normal bubbling phase event listener. By adding it here, we
              // ensure it's the last event listener that is called during the
              // bubbling phase.
              this._callOnReportValidity(invalidEvent);
            },
            { once: true },
          );
        },
        {
          // Listen during the capture phase, which will happen before the
          // bubbling phase. That way, we can add a final event listener that
          // will run after other event listeners, and we can check if it was
          // default prevented. This works because invalid does not bubble.
          capture: true,
        },
      );
    }

    public override checkValidity() {
      this._doNotReportInvalid = true;

      const valid = super.checkValidity();

      this._doNotReportInvalid = false;

      return valid;
    }

    public override reportValidity() {
      this._isSelfReportingValidity = true;

      const valid = super.reportValidity();

      // Constructor's invalid listener will handle reporting invalid events.
      if (valid) this._callOnReportValidity(null);

      this._isSelfReportingValidity = false;

      return valid;
    }

    private _callOnReportValidity(invalidEvent: Event | null) {
      // Since invalid events do not bubble to parent listeners, and because
      // our invalid listeners are added lazily after other listeners, we can
      // reliably read `defaultPrevented` synchronously without worrying
      // about waiting for another listener that could cancel it.
      const wasCanceled = invalidEvent?.defaultPrevented;

      if (wasCanceled) return;

      this[onReportValidity](invalidEvent);

      // If an implementation calls invalidEvent.preventDefault() to stop the
      // platform popup from displaying, focusing is also prevented, so we need
      // to manually focus.
      const implementationCanceledFocus =
        !wasCanceled && invalidEvent?.defaultPrevented;

      if (!implementationCanceledFocus) return;

      // The control should be focused when:
      // - `control.reportValidity()` is called (self-reporting).
      // - a form is reporting validity for its controls and this is the first
      //   invalid control.
      if (
        this._isSelfReportingValidity ||
        isFirstInvalidControlInForm(this[internals].form, this)
      ) {
        this.focus();
      }
    }

    public [onReportValidity](_invalidEvent: Event | null) {
      throw new SystemError(
        "Method not implemented. Implement [onReportValidity].",
        "mixins/with-on-report-validity",
      );
    }

    public override formAssociatedCallback(form: HTMLFormElement | null) {
      // can't use super.formAssociatedCallback?.() due to closure
      if (super.formAssociatedCallback) {
        super.formAssociatedCallback(form);
      }

      // Clean up previous form listeners.
      this._cleanupFormListeners.abort();

      if (!form) return;

      this._cleanupFormListeners = new AbortController();

      // Add a listener that fires when the form runs constraint validation and
      // the control is valid, so that it may remove its error styles.
      //
      // This happens on `form.reportValidity()` and `form.requestSubmit()`
      // (both when the submit fails and passes).
      addFormReportValidListener(
        this,
        form,
        () => {
          this._callOnReportValidity(null);
        },
        this._cleanupFormListeners.signal,
      );
    }
  }

  return WithOnReportValidity;
};

export default withOnReportValidity;
