import { Validator } from "../utils";

export type FileInputState = {
  /**
   * Whether the file input is required.
   */
  readonly required: boolean;
};

class FileInputValidator extends Validator<FileInputState> {
  private _fileInputControl?: HTMLInputElement;

  protected override computeValidity(state: FileInputState) {
    if (!this._fileInputControl) {
      // Lazily create the platform input
      this._fileInputControl = document.createElement("input");
      this._fileInputControl.type = "file";
    }

    this._fileInputControl.required = state.required;

    return {
      validity: this._fileInputControl.validity,
      validationMessage: this._fileInputControl.validationMessage,
    };
  }

  protected override equals(prev: FileInputState, next: FileInputState) {
    return prev.required === next.required;
  }

  protected override copy(state: FileInputState) {
    const { required } = state;

    return {
      required,
    };
  }
}

export default FileInputValidator;
