import { customElement } from "lit/decorators.js";
import { baseInputStyles } from "../base-input";
import { Switch } from "./switch";
import styles from "./switch.style";

/**
 * @summary A switch component.
 *
 * @tag tap-switch
 *
 * @prop {boolean} [selected=false] - Indicates whether the switch is selected.
 * @prop {boolean} [disabled=false] - Indicates whether the switch is disabled.
 * @prop {string} [value='on'] - The value of the switch when it is checked.
 * @prop {string} label - Defines a string value that can be used to name switch input.\
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} labelledby - Identifies the element (or elements) that labels the switch input.\
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 * @prop {boolean} [required=false] - Indicates that the user must specify a value for the input before the
 * owning form can be submitted and will render an error state when
 * `reportValidity()` is invoked when value is empty.\
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
 */
@customElement("tap-switch")
export class TapSwitch extends Switch {
  public static override readonly styles = [baseInputStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-switch": TapSwitch;
  }
}
