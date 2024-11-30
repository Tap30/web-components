import { customElement } from "lit/decorators.js";
import { baseInputStyles } from "../base-input";
import { Radio } from "./radio";
import styles from "./radio.style";

/**
 * @summary The radio component.
 *
 * @prop {boolean} [checked=false] - Indicates whether the radio is checked.
 * @prop {boolean} [disabled=false] - Indicates whether the radio is disabled.
 * @prop {string} [value='on'] - The value of the radio when it is checked.
 * @prop {boolean} [error=false] - Gets or sets whether or not the input is in a visually invalid state.\
 * This error state overrides the error state controlled by
 * `reportValidity()`.
 * @prop {string} label - The label of the input.\
 * Displays a bound `label` element when `showLabel` is `true`.
 * Otherwise, sets an `aria-label` attribute.
 * @prop {boolean} [show-label=false] - Whether or not the label is visible.
 * @prop {boolean} [required=false] - Indicates that the user must specify a value for the input before the
 * owning form can be submitted and will render an error state when
 * `reportValidity()` is invoked when value is empty.\
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
 */
@customElement("tap-radio")
export class TapRadio extends Radio {
  public static override readonly styles = [baseInputStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-radio": TapRadio;
  }
}
