/*
  Mixes in form-associated behavior for a class. This allows an element to add
  values to `<form>` elements.

  Cherry-picked from: https://github.com/material-components/material-web/blob/main/labs/behaviors/form-associated.ts
*/

import type { LitElement, PropertyDeclaration } from "lit";
import { property } from "lit/decorators.js";
import type { MixinBase, MixinReturn } from "./types";
import { internals, type WithElementInternals } from "./with-element-internals";

export const getFormValue = Symbol("getFormValue");
export const getFormState = Symbol("getFormState");

export type FormValue = File | string | FormData;

export type FormRestoreState =
  | File
  | string
  | Array<[string, FormDataEntryValue]>;

export type FormRestoreReason = "restore" | "autocomplete";

export interface FormAssociatedConstructor {
  /**
   * Indicates that an element is participating in form association.
   */
  readonly formAssociated: true;
}

export interface FormAssociated {
  /**
   * The associated form element with which this element's value will submit.
   */
  readonly form: HTMLFormElement | null;

  /**
   * The labels this element is associated with.
   */
  readonly labels: NodeList;

  /**
   * The HTML name to use in form submission.
   */
  name: string;

  /**
   * Whether or not the element is disabled.
   */
  disabled: boolean;

  /**
   * Gets the current form value of a component.
   *
   * @return The current form value.
   */
  [getFormValue](): FormValue | null;

  /**
   * Gets the current form state of a component. Defaults to the component's
   * `[formValue]`.
   *
   * Use this when the state of an element is different from its value, such as
   * checkboxes (internal boolean state and a user string value).
   *
   * @return The current form state, defaults to the form value.
   */
  [getFormState](): FormValue | null;

  /**
   * A callback for when a form component should be disabled or enabled. This
   * can be called in a variety of situations, such as disabled `<fieldset>`s.
   *
   * @param disabled Whether or not the form control should be disabled.
   */
  formDisabledCallback(disabled: boolean): void;

  /**
   * A callback for when the form requests to reset its value. Typically, the
   * default value that is reset is represented in the attribute of an element.
   *
   * This means the attribute used for the value should not update as the value
   * changes. For example, a checkbox should not change its default `checked`
   * attribute when selected. Ensure form values do not reflect.
   */
  formResetCallback(): void;

  /**
   * A callback for when the form restores the state of a component. For
   * example, when a page is reloaded or forms are autofilled.
   *
   * @param state The state to restore, or null to reset the form control's
   *     value.
   * @param reason The reason state was restored, either `'restore'` or
   *   `'autocomplete'`.
   */
  formStateRestoreCallback(
    state: FormRestoreState | null,
    reason: FormRestoreReason,
  ): void;

  /**
   * An optional callback for when the associated form changes.
   *
   * @param form The new associated form, or `null` if there is none.
   */
  formAssociatedCallback?(form: HTMLFormElement | null): void;
}

const withFormAssociated = <
  T extends MixinBase<LitElement & WithElementInternals>,
>(
  BaseClass: T,
): MixinReturn<T & FormAssociatedConstructor, FormAssociated> => {
  abstract class WithFormAssociatedClass
    extends BaseClass
    implements FormAssociated
  {
    public static readonly formAssociated = true;

    public get form(): HTMLFormElement | null {
      return this[internals].form;
    }

    public get labels(): NodeList {
      return this[internals].labels;
    }

    /*
      We don't use Lit's default getter/setter (`noAccessor: true`) because
      the attributes need to be updated synchronously to work with synchronous
      form APIs, and Lit updates attributes async by default.
    */
    @property({ noAccessor: true })
    get name(): string {
      return this.getAttribute("name") ?? "";
    }

    public set name(name: string) {
      // Note: setting name to null or empty does not remove the attribute.

      this.setAttribute("name", name);

      /*
        We don't need to call `requestUpdate()` since it's called synchronously
        in `attributeChangedCallback()`.
      */
    }

    @property({ type: Boolean, noAccessor: true })
    public get disabled() {
      return this.hasAttribute("disabled");
    }

    public set disabled(disabled: boolean) {
      this.toggleAttribute("disabled", disabled);

      /*
        We don't need to call `requestUpdate()` since it's called synchronously
        in `attributeChangedCallback()`.
      */
    }

    public override attributeChangedCallback(
      attrName: string,
      attrOldValue: string | null,
      attrNewValue: string | null,
    ): void {
      /*
        Manually `requestUpdate()` for `name` and `disabled` when their
        attribute or property changes.

        The properties update their attributes, so this callback is invoked
        immediately when the properties are set. We call `requestUpdate()` here
        instead of letting Lit set the properties from the attribute change.
        That would cause the properties to re-set the attribute and invoke this
        callback again in a loop. This leads to stale state when Lit tries to
        determine if a property changed or not.
      */
      if (attrName === "name" || attrName === "disabled") {
        const oldValue =
          attrName === "disabled" ? attrOldValue !== null : attrOldValue;

        this.requestUpdate(attrName, oldValue);
        return;
      }

      super.attributeChangedCallback(attrName, attrOldValue, attrNewValue);
    }

    public override requestUpdate(
      name?: PropertyKey,
      oldValue?: unknown,
      options?: PropertyDeclaration,
    ) {
      super.requestUpdate(name, oldValue, options);

      /*
        If any properties change, update the form value, which may have changed
        as well.

        Update the form value synchronously in `requestUpdate()` rather than
        `update()` or `updated()`, which are async. This is necessary to ensure
        that form data is updated in time for synchronous event listeners.
      */
      this[internals].setFormValue(this[getFormValue](), this[getFormState]());
    }

    public [getFormValue](): FormValue | null {
      throw new Error("Method not implemented. Implement [getFormValue].");
    }

    public [getFormState](): FormValue | null {
      return this[getFormValue]();
    }

    public abstract formDisabledCallback(disabled: boolean): void;

    public abstract formAssociatedCallback?(form: HTMLFormElement | null): void;

    public abstract formResetCallback(): void;

    public abstract formStateRestoreCallback(
      state: FormRestoreState | null,
      reason: FormRestoreReason,
    ): void;
  }

  return WithFormAssociatedClass;
};

export default withFormAssociated;
