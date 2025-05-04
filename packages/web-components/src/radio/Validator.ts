import { Validator, type ValidityAndMessage } from "../utils/index.ts";

export type RadioState = {
  /**
   * Whether the radio is checked.
   */
  readonly checked: boolean;

  /**
   * Whether the radio is required.
   */
  readonly required: boolean;
};

export type RadioGroupState = readonly [RadioState, ...RadioState[]];

class RadioValidator extends Validator<RadioGroupState> {
  private _radioControl?: HTMLInputElement;

  protected override computeValidity(
    states: RadioGroupState,
  ): ValidityAndMessage {
    if (!this._radioControl) {
      // Lazily create the platform input
      this._radioControl = document.createElement("input");
      this._radioControl.type = "radio";
      // A name is required for validation to run
      this._radioControl.name = "group";
    }

    let isRequired = false;
    let isChecked = false;

    for (const { checked, required } of states) {
      if (required) isRequired = true;
      if (checked) isChecked = true;
    }

    // Firefox v119 doesn't compute grouped radio validation correctly while
    // they are detached from the DOM, which is why we don't render multiple
    // virtual <input>s. Instead, we can check the required/checked states and
    // grab the i18n'd validation message if the value is missing.
    this._radioControl.checked = isChecked;
    this._radioControl.required = isRequired;

    return {
      validity: {
        valueMissing: isRequired && !isChecked,
      },
      validationMessage: this._radioControl.validationMessage,
    };
  }

  protected override equals(
    prevGroup: RadioGroupState,
    nextGroup: RadioGroupState,
  ): boolean {
    if (prevGroup.length !== nextGroup.length) return false;

    for (let i = 0; i < prevGroup.length; i++) {
      const prev = prevGroup[i]!;
      const next = nextGroup[i]!;

      if (prev.checked !== next.checked || prev.required !== next.required) {
        return false;
      }
    }

    return true;
  }

  protected override copy(states: RadioGroupState): RadioGroupState {
    return states.map(({ checked, required }) => ({
      checked,
      required,
    })) as unknown as RadioGroupState;
  }
}

export default RadioValidator;
