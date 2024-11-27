import { customElement } from "lit/decorators.js";
import baseInputStyle from "../base-input/base-input.style";
import { Checkbox } from "./checkbox";
import styles from "./checkbox.style";

/**
 * @summary A checkbox component with support for checked and indeterminate states.
 *
 * @prop {boolean} [checked=false] - Indicates whether the checkbox is checked.
 * @prop {boolean} [indeterminate=false] - Indicates whether the checkbox is in an indeterminate state.
 * @prop {boolean} [disabled=false] - Indicates whether the checkbox is disabled.
 * @prop {string} [value='on'] - The value of the checkbox when it is checked.
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
