import { customElement } from "lit/decorators.js";
import baseInputStyle from "../base-input/base-input.style";
import { Checkbox } from "./checkbox";
import styles from "./checkbox.style";

/**
 * @summary A checkbox component.
 *
 * @prop {boolean} [checked=false] - Indicates whether the checkbox is checked.
 * @prop {boolean} [indeterminate=false] - Indicates whether the checkbox is in an indeterminate state.
 * @prop {boolean} [disabled=false] - Indicates whether the checkbox is disabled.
 * @prop {string} [value='on'] - The value of the checkbox when it is checked.
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
@customElement("tap-checkbox")
export class TapCheckbox extends Checkbox {
  public static override readonly styles = [baseInputStyle, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-checkbox": TapCheckbox;
  }
}
