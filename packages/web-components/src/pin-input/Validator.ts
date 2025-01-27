import { Validator } from "../utils/index.ts";

export type PinInputState = {
  /**
   * The value of the input.
   */
  readonly value: string;

  /**
   * Whether the input is required.
   */
  readonly required: boolean;

  /**
   * The number of inputs.
   * Defaults to 4.
   */
  readonly pins: number;

  /**
   * The number of each input's length.
   * Defaults to 1.
   */
  readonly pinLength: number;
};

class PinInputValidator extends Validator<PinInputState> {
  private _control?: HTMLInputElement;

  protected override computeValidity(state: PinInputState) {
    if (!this._control) {
      // Lazily create the platform input
      this._control = document.createElement("input");
      this._control.type = "text";
    }

    const { pinLength, pins, value, required } = state;

    const expectedLength = pins * pinLength;

    this._control.value = expectedLength === value.length ? value : "";
    this._control.required = required;

    return {
      validity: this._control.validity,
      validationMessage: this._control.validationMessage,
    };
  }

  protected override equals(prev: PinInputState, next: PinInputState) {
    return (
      prev.value === next.value &&
      prev.required === next.required &&
      prev.pins === next.pins &&
      prev.pinLength === next.pinLength
    );
  }

  protected override copy(state: PinInputState) {
    const { value, required, pinLength, pins } = state;

    return {
      value,
      required,
      pinLength,
      pins,
    };
  }
}

export default PinInputValidator;
