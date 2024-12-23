import { customElement } from "lit/decorators.js";
import baseInputStyle from "../base-input/base-input.style";
import { Checkbox } from "./checkbox";
import styles from "./checkbox.style";

/**
 * @summary A checkbox component.
 *
 * @tag tap-checkbox
 *
 * @prop {boolean} [checked=false] - Indicates whether the checkbox is checked.
 * @prop {boolean} [indeterminate=false] - Indicates whether the checkbox is in an indeterminate state.
 * @prop {boolean} [disabled=false] - Indicates whether the checkbox is disabled.
 * @prop {string} [value='on'] - The value of the checkbox when it is checked.
 * @prop {string} label - Defines a string value that can be used to name checkbox input.\
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} labelledby - Identifies the element (or elements) that labels the checkbox input.\
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
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
