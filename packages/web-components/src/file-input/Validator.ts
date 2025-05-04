import { Validator, type ValidityAndMessage } from "../utils/index.ts";

export type FileInputState = {
  /**
   * Whether the file input is required.
   */
  readonly required: boolean;

  /**
   * The value of the input.
   */
  readonly value: string;
};

class FileInputValidator extends Validator<FileInputState> {
  private _control?: HTMLInputElement;

  protected override computeValidity(
    state: FileInputState,
  ): ValidityAndMessage {
    if (!this._control) {
      // Lazily create the platform input
      this._control = document.createElement("input");
      this._control.type = "text";
    }

    this._control.required = state.required;
    this._control.value = state.value;

    return {
      validity: this._control.validity,
      validationMessage: this._control.validationMessage,
    };
  }

  protected override equals(
    prev: FileInputState,
    next: FileInputState,
  ): boolean {
    return prev.required === next.required && prev.value === next.value;
  }

  protected override copy(state: FileInputState): FileInputState {
    const { required, value } = state;

    return {
      required,
      value,
    };
  }
}

export default FileInputValidator;
