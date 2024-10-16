import { customElement } from "lit/decorators.js";
import { Stepper } from "./stepper.js";
import styles from "./stepper.style.js";

/**
 * @summary A form item that shows a value and can be increased or decreased by tw buttons
 *
 * @prop {string} [unit=''] - A single quantity of the value
 * @prop {boolean} [disabled=false] - If `true`, the component is disabled.
 * @prop {number} [step=1] - The number to which the current value is increased or decreased.
 * It can be an integer or decimal
 * @prop {'small' | 'medium'} [size='medium'] - The size of icons and font.
 * @prop {number} [min=-Infinity] - The min value.
 * @prop {number} [max=Infinity] - The max value.
 * @prop {number} [fullWidth=false] - If `true` the component will fill the parent.
 * @prop {number} [value=0] - The current value.
 *
 * @fires stepper-change - Fired when the value of the stepper changes.
 *
 * @csspart [stepper] - The container that wraps the stepper component.
 * @csspart [decrease-button] - The button that contains minus icon and decrease the value.
 * @csspart [increase-button] - The button that contains plus icon and increases the value.
 * @csspart [value] - The `p` tag that shows the `value`.
 * @csspart [unit] - The `p` tag that shows the `unit` and will be hidden if `unit` not exists.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family]
 * @cssprop [--tap-stepper-typography-label-sm-size=--tap-sys-typography-label-md-size]
 * @cssprop [--tap-stepper-typography-label-md-size=--tap-sys-typography-label-lg-size]
 */
@customElement("tap-stepper")
export class TapStepper extends Stepper {
  static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-stepper": Stepper;
  }
}
