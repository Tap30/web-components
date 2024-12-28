import { customElement } from "lit/decorators.js";
import { baseInputStyles } from "../base-input";
import { Radio } from "./radio";
import styles from "./radio.style";

/**
 * @summary The radio component.
 *
 * @tag tapsi-radio
 *
 * @prop {boolean} [checked=false] - Indicates whether the radio is checked.
 * @prop {boolean} [disabled=false] - Indicates whether the radio is disabled.
 * @prop {string} [value='on'] - The value of the radio when it is checked.
 * @prop {string} label - Defines a string value that can be used to name radio input.\
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} labelledby - Identifies the element (or elements) that labels the radio input.\
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 * @prop {boolean} [required=false] - Indicates that the user must specify a value for the input before the
 * owning form can be submitted and will render an error state when
 * `reportValidity()` is invoked when value is empty.\
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
 */
@customElement("tapsi-radio")
export class TapsiRadio extends Radio {
  public static override readonly styles = [baseInputStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-radio": TapsiRadio;
  }
}
