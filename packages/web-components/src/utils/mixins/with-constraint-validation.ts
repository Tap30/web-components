import {
  type LitElement,
  type PropertyDeclaration,
  type PropertyValues,
} from "lit";
import isSsr from "../is-ssr.ts";
import SystemError from "../SystemError.ts";
import type Validator from "../Validator";
import type { MixinBase, MixinReturn } from "./types";
import {
  internals,
  type WithElementInternals,
} from "./with-element-internals.ts";
import { type FormAssociated } from "./with-form-associated.ts";

/**
 * A symbol property used to create a constraint validation `Validator`.
 * Required for all `withConstraintValidation()` elements.
 */
export const createValidator = Symbol("createValidator");

/**
 * A symbol property used to return an anchor for constraint validation popups.
 * Required for all `withConstraintValidation()` elements.
 */
export const getValidityAnchor = Symbol("getValidityAnchor");

/**
 * A form associated element that provides constraint validation APIs.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
 */
export interface ConstraintValidation extends FormAssociated {
  /**
   * Returns a ValidityState object that represents the validity states of the
   * element.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
   */
  readonly validity: ValidityState;

  /**
   * Returns a validation error message or an empty string if the element is
   * valid.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/validationMessage
   */
  readonly validationMessage: string;

  /**
   * Returns whether an element will successfully validate based on forms
   * validation rules and constraints.
   *
   * Disabled and readonly elements will not validate.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/willValidate
   */
  readonly willValidate: boolean;

  /**
   * Checks the element's constraint validation and returns true if the element
   * is valid or false if not.
   *
   * If invalid, this method will dispatch an `invalid` event.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity
   *
   * @return true if the element is valid, or false if not.
   */
  checkValidity(): boolean;

  /**
   * Checks the element's constraint validation and returns true if the element
   * is valid or false if not.
   *
   * If invalid, this method will dispatch a cancelable `invalid` event. If not
   * canceled, a the current `validationMessage` will be reported to the user.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity
   *
   * @return true if the element is valid, or false if not.
   */
  reportValidity(): boolean;

  /**
   * Sets the element's constraint validation error message. When set to a
   * non-empty string, `validity.customError` will be true and
   * `validationMessage` will display the provided error.
   *
   * Use this method to customize error messages reported.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
   *
   * @param error The error message to display, or an empty string.
   */
  setCustomValidity(error: string): void;

  /**
   * Creates and returns a `Validator` that is used to compute and cache
   * validity for the element.
   *
   * A validator that caches validity is important since constraint validation
   * must be computed synchronously and frequently in response to constraint
   * validation property changes.
   */
  [createValidator](): Validator<unknown>;

  /**
   * Returns shadow DOM child that is used as the anchor for the platform
   * `reportValidity()` popup. This is often the root element or the inner
   * focus-delegated element.
   */
  [getValidityAnchor](): HTMLElement | null;
}

/**
 * Mixes in constraint validation APIs for an element.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
 * for more details.
 *
 * Implementations must provide a validator to cache and compute its validity,
 * along with a shadow root element to anchor validation popups to.
 *
 * @example
 * ```ts
 * const baseClass = withConstraintValidation(
 *   withFormAssociated(withElementInternals(LitElement))
 * );
 *
 * class MyCheckbox extends baseClass {
 *   \@property({type: Boolean}) checked = false;
 *   \@property({type: Boolean}) required = false;
 *
 *   [createValidator]() {
 *     return new CheckboxValidator(() => this);
 *   }
 *
 *   [getValidityAnchor]() {
 *     return this.renderRoot.querySelector('.root');
 *   }
 * }
 * ```
 *
 * @param base The class to mix functionality into.
 */
const withConstraintValidation = <
  T extends MixinBase<LitElement & FormAssociated & WithElementInternals>,
>(
  base: T,
): MixinReturn<T, ConstraintValidation> => {
  abstract class WithConstraintValidation
    extends base
    implements ConstraintValidation
  {
    /**
     * A validator instance created from `[createValidator]()`.
     */
    private _validator?: Validator<unknown>;

    /**
     * Needed for Safari, see https://bugs.webkit.org/show_bug.cgi?id=261432
     * TODO: Replace with this[internals].validity.customError when resolved.
     */
    private _customValidationMessage = "";

    public get validity() {
      this._syncValidity();

      return this[internals].validity;
    }

    public get validationMessage() {
      this._syncValidity();

      return this[internals].validationMessage;
    }

    public get willValidate() {
      this._syncValidity();

      return this[internals].willValidate;
    }

    public checkValidity() {
      this._syncValidity();

      return this[internals].checkValidity();
    }

    public reportValidity() {
      this._syncValidity();

      return this[internals].reportValidity();
    }

    public setCustomValidity(error: string) {
      this._customValidationMessage = error;

      this._syncValidity();
    }

    public override requestUpdate(
      name?: PropertyKey,
      oldValue?: unknown,
      options?: PropertyDeclaration,
    ) {
      super.requestUpdate(name, oldValue, options);

      this._syncValidity();
    }

    public override firstUpdated(changed: PropertyValues<this>) {
      super.firstUpdated(changed);

      // Sync the validity again when the element first renders, since the
      // validity anchor is now available.
      //
      // Elements that `delegatesFocus: true` to an `<input>` will throw an
      // error in Chrome and Safari when a form tries to submit or call
      // `form.reportValidity()`:
      // "An invalid form control with name='' is not focusable"
      //
      // The validity anchor MUST be provided in `internals.setValidity()` and
      // MUST be the `<input>` element rendered.
      //
      // See https://lit.dev/playground/#gist=6c26e418e0010f7a5aac15005cde8bde
      // for a reproduction.
      this._syncValidity();
    }

    private _syncValidity() {
      if (isSsr()) return;

      if (!this._validator) {
        this._validator = this[createValidator]();
      }

      const { validity, validationMessage: nonCustomValidationMessage } =
        this._validator.getValidity();

      const flags = validity;
      const hasCustomError = !!this._customValidationMessage;
      const validationMessage =
        this._customValidationMessage || nonCustomValidationMessage;

      const anchor = this[getValidityAnchor]() ?? undefined;

      flags.customError = hasCustomError;

      this[internals].setValidity(flags, validationMessage, anchor);
    }

    public [createValidator](): Validator<unknown> {
      throw new SystemError(
        "Method not implemented. Implement [createValidator].",
        "mixins/with-constraint-validation",
      );
    }

    public [getValidityAnchor](): HTMLElement | null {
      throw new SystemError(
        "Method not implemented. Implement [getValidityAnchor].",
        "mixins/with-constraint-validation",
      );
    }
  }

  return WithConstraintValidation;
};

export default withConstraintValidation;
