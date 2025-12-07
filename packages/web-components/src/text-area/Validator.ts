import {
  getTooLongValidationMessage,
  getTooShortValidationMessage,
} from "../internals/index.ts";
import { Validator, type ValidityAndMessage } from "../utils/index.ts";

type State = {
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
};

export type TextAreaState = {
  /**
   * The state to validate.
   */
  state: State;

  /**
   * The `<textarea>` that is rendered on the page.
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
  control: HTMLTextAreaElement | null;
};

class TextAreaValidator extends Validator<TextAreaState> {
  private _inputControl?: HTMLTextAreaElement;

  protected override computeValidity({
    state,
    control,
  }: TextAreaState): ValidityAndMessage {
    let input = control;

    if (!input) {
      input = this._inputControl || document.createElement("textarea");
      this._inputControl = input;
    }

    if (input.value !== state.value) {
      // Only programmatically set the value if there's a difference. When using
      // the rendered control, the value will always be up to date. Setting the
      // property (even if it's the same string) will reset the internal <input>
      // dirty flag, making minlength and maxlength validation reset.
      input.value = state.value;
    }

    input.required = state.required;

    let tooShort = false;
    let tooLong = false;
    let validationMessage;

    const currentLength = input.value.length;
    const minLength = state.minLength ?? -1;
    const maxLength = state.maxLength ?? -1;

    // Custom minlength validation: the browser's native minlength check may not trigger
    // correctly in all scenarios, so we enforce it manually here.
    if (currentLength < minLength && minLength > -1) {
      tooShort = true;
      validationMessage = getTooShortValidationMessage({
        currentLength,
        minLength,
      });
    }

    // Custom maxlength validation: the browser's native maxlength check may not trigger
    // correctly in all scenarios, so we enforce it manually here.
    if (currentLength > maxLength && maxLength > -1) {
      tooLong = true;
      validationMessage = getTooLongValidationMessage({
        currentLength,
        maxLength,
      });
    }

    return {
      validity: { ...input.validity, tooLong, tooShort },
      validationMessage: validationMessage ?? input.validationMessage,
    };
  }

  protected override equals(
    { state: prev }: TextAreaState,
    { state: next }: TextAreaState,
  ): boolean {
    return (
      prev.value === next.value &&
      prev.required === next.required &&
      prev.minLength === next.minLength &&
      prev.maxLength === next.maxLength
    );
  }

  protected override copy({ state }: TextAreaState): TextAreaState {
    const { value, required, minLength, maxLength } = state;

    return {
      state: { value, required, minLength, maxLength },
      // Don't hold a reference to the rendered control when copying since we
      // don't use it when checking if the state changed.
      control: null,
    };
  }
}

export default TextAreaValidator;
