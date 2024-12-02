import { Validator } from "../utils";

export type InputState = {
  /**
   * The current value.
   */
  readonly value: string;

  /**
   * Whether the textarea is required.
   */
  readonly required: boolean;

  /**
   * The minimum length of the value.
   */
  readonly minLength: number;

  /**
   * The maximum length of the value.
   */
  readonly maxLength: number;
  /**
   * The `<input>` type.
   *
   * Not all constraint validation properties apply to every type. See
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#validation-related_attributes
   * for which properties will apply to which types.
   */
  readonly type: string;

  /**
   * The regex pattern a value must match.
   */
  readonly pattern: string;

  /**
   * The minimum value.
   */
  readonly min: string;

  /**
   * The maximum value.
   */
  readonly max: string;

  /**
   * The step interval of the value.
   */
  readonly step: string;
};

/**
 * Constraint validation for a text field.
 */
export type TextFieldState = {
  /**
   * The input state to validate.
   */
  state: InputState;

  /**
   * The `<input>` that is rendered on the page.
   *
   * `minlength` and `maxlength` validation do not apply until a user has
   * interacted with the control and the element is internally marked as dirty.
   * This is a spec quirk, the two properties behave differently from other
   * constraint validation.
   *
   * This means we need an actual rendered element instead of a virtual one,
   * since the virtual element will never be marked as dirty.
   *
   * This can be `null` if the element has not yet rendered, and the validator
   * will fall back to virtual elements for other constraint validation
   * properties, which do apply even if the control is not dirty.
   */
  control: HTMLInputElement | null;
};

class TextFieldValidator extends Validator<TextFieldState> {
  private _inputControl?: HTMLInputElement;

  protected override computeValidity({ state, control }: TextFieldState) {
    let input = control;

    if (!input) {
      input = this._inputControl || document.createElement("input");
      this._inputControl = input;
    }

    input.type = state.type;

    if (input.value !== state.value) {
      // Only programmatically set the value if there's a difference. When using
      // the rendered control, the value will always be up to date. Setting the
      // property (even if it's the same string) will reset the internal <input>
      // dirty flag, making minlength and maxlength validation reset.
      input.value = state.value;
    }

    input.required = state.required;

    // The following IDLAttribute properties will always hydrate an attribute,
    // even if set to a the default value ('' or -1). The presence of the
    // attribute triggers constraint validation, so we must remove the attribute
    // when empty.

    if (state.pattern) {
      input.pattern = state.pattern;
    } else {
      input.removeAttribute("pattern");
    }

    if (state.min) {
      input.min = state.min;
    } else {
      input.removeAttribute("min");
    }

    if (state.max) {
      input.max = state.max;
    } else {
      input.removeAttribute("max");
    }

    if (state.step) {
      input.step = state.step;
    } else {
      input.removeAttribute("step");
    }

    // Use -1 to represent no minlength and maxlength, which is what the
    // platform input returns. However, it will throw an error if you try to
    // manually set it to -1.
    //
    // While the type is `number`, it may actually be `null` at runtime.
    // `null > -1` is true since `null` coerces to `0`, so we default null and
    // undefined to -1.
    //
    // We set attributes instead of properties since setting a property may
    // throw an out of bounds error in relation to the other property.
    // Attributes will not throw errors while the state is updating.
    if ((state.minLength ?? -1) > -1) {
      input.setAttribute("minlength", String(state.minLength));
    } else {
      input.removeAttribute("minlength");
    }

    if ((state.maxLength ?? -1) > -1) {
      input.setAttribute("maxlength", String(state.maxLength));
    } else {
      input.removeAttribute("maxlength");
    }

    return {
      validity: input.validity,
      validationMessage: input.validationMessage,
    };
  }

  protected override equals(
    { state: prev }: TextFieldState,
    { state: next }: TextFieldState,
  ) {
    return (
      prev.type === next.type &&
      prev.value === next.value &&
      prev.required === next.required &&
      prev.minLength === next.minLength &&
      prev.maxLength === next.maxLength &&
      prev.pattern === next.pattern &&
      prev.min === next.min &&
      prev.max === next.max &&
      prev.step === next.step
    );
  }

  protected override copy({ state }: TextFieldState): TextFieldState {
    const {
      type,
      pattern,
      min,
      max,
      step,
      value,
      required,
      minLength,
      maxLength,
    } = state;

    return {
      state: {
        value,
        required,
        minLength,
        maxLength,
        type,
        pattern,
        min,
        max,
        step,
      },
      // Don't hold a reference to the rendered control when copying since we
      // don't use it when checking if the state changed.
      control: null,
    };
  }
}

export default TextFieldValidator;
