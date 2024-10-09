import { customElement } from "lit/decorators.js";
import { Switch } from "./switch";
import styles from "./switch.style";

/**
 * ### Example
 *
 * ##### Basic Usage
 *
 * ```html
 * <tap-switch></tap-switch>
 * ```
 *
 * ##### Checked State
 *
 * ```html
 * <tap-switch checked></tap-switch>
 * ```
 *
 * ##### Disabled State
 *
 * ```html
 * <tap-switch disabled></tap-switch>
 * ```
 *
 * @summary A switch component for toggling between on and off states.
 *
 * @prop {boolean} checked - Whether the switch is in the checked (on) state.
 * @prop {boolean} disabled - Whether the switch is disabled and non-interactive.
 * @prop {string} value - The value associated with the switch when it is checked.
 *
 * @csspart switch - The container that wraps the switch component.
 * @csspart input - The input element that represents the switch's toggle functionality.
 * @csspart slider - The slider element that visually represents the switch's state.
 *
 * @cssprop [--tap-switch-background-color=--tap-sys-color-surface-tertiary] - The background color of the switch.
 * @cssprop [--tap-switch-checked-background-color=--tap-sys-color-surface-inverse-primary] - The background color of the checked switch.
 * @cssprop [--tap-switch-disabled-background-color=var(--tap-sys-color-surface-disabled)] - The background color of the disabled switch.
 */

@customElement("tap-switch")
export class TapSwitch extends Switch {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-switch": TapSwitch;
  }
}
