import { customElement } from "lit/decorators.js";
import baseInputStyle from "../base-input/base-input.style.ts";
import styles from "./checkbox.style.ts";
import { Checkbox } from "./checkbox.ts";

/**
 * @summary A checkbox component.
 *
 * @tag tapsi-checkbox
 *
 * @prop {boolean} [checked=false] - Indicates whether the checkbox is checked.
 * @prop {boolean} [indeterminate=false] - Indicates whether the checkbox is in an indeterminate state.
 * @prop {boolean} [disabled=false] - Indicates whether the checkbox is disabled.
 * @prop {string} [value='on'] - The value of the checkbox when it is checked.
 * @prop {boolean} [error=false] - Whether the checkbox has error.
 * @prop {string} label - Defines a string value that can be used to name checkbox input.\
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} labelledby - Identifies the element (or elements) that labels the checkbox input.\
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 * @prop {boolean} [required=false] - Indicates that the user must specify a value for the input before the
 * owning form can be submitted and will render an error state when
 * `reportValidity()` is invoked when value is empty.\
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
 * @prop {boolean} [autofocus=false] -
 * Indicates that the element should be focused on page load.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
 */
@customElement("tapsi-checkbox")
export class TapsiCheckbox extends Checkbox {
  public static override readonly styles = [baseInputStyle, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-checkbox": TapsiCheckbox;
  }
}
