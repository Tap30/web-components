import { Validator } from "../utils";

export type CheckboxState = {
  /**
   * Whether the checkbox is checked.
   */
  readonly checked: boolean;

  /**
   * Whether the checkbox is required.
   */
  readonly required: boolean;
};

class CheckboxValidator extends Validator<CheckboxState> {
  private _checkboxControl?: HTMLInputElement;

  protected override computeValidity(state: CheckboxState) {
    if (!this._checkboxControl) {
      // Lazily create the platform input
      this._checkboxControl = document.createElement("input");
      this._checkboxControl.type = "checkbox";
    }

    this._checkboxControl.checked = state.checked;
    this._checkboxControl.required = state.required;

    return {
      validity: this._checkboxControl.validity,
      validationMessage: this._checkboxControl.validationMessage,
    };
  }

  protected override equals(prev: CheckboxState, next: CheckboxState) {
    return prev.checked === next.checked && prev.required === next.required;
  }

  protected override copy(state: CheckboxState) {
    const { checked, required } = state;

    return {
      checked,
      required,
    };
  }
}

export default CheckboxValidator;
