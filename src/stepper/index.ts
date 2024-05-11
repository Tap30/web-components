import { customElement } from 'lit/decorators.js';
import { Stepper } from './stepper.js';
import styles from './stepper.style.js';

/**
 * ### Example
 * ```html
 * <tap-stepper unit="USDT" step="1" min="0" max="10" size="medium" fullWidth></tap-avatar>
 * ```
 * @summary A form item that shows a value and can be increased or decreased by tw buttons
 *
 * @prop {string} [unit=''] - A single quantity of the value
 * @prop {boolean} disabled - If `true`, the component is disabled.
 * @prop {number} [step="1"] - The number to which the current value is increased or decreased.
 * It can be an integer or decimal
 * @prop {'small' | 'medium'} [size='medium'] - The size of icons and font.
 * @prop {number} min - The min value.
 * @prop {number} max - The max value.
 * @prop {number} fullWidth - If `true` the component will fill the parent.
 * @prop {number} [value="0"] - The current value.
 *
 * @fires {CustomEvent} - Stepper change event
 *
 * @csspart stepper - The container that wraps the stepper component.
 * @csspart decrease-button - The button that contains minus icon and decrease the value.
 * @csspart increase-button - The button that contains plus icon and increases the value.
 * @csspart value - The `p` tag that shows the `value`.
 * @csspart unit - The `p` tag that shows the `unit` and will be hidden if `unit` not exists.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family]
 * @cssprop [--tap-stepper-typography-label-sm-size=--tap-sys-typography-label-md-size]
 * @cssprop [--tap-stepper-typography-label-md-size=--tap-sys-typography-label-lg-size]
 */
@customElement('tap-stepper')
export class TapStepper extends Stepper {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-stepper': Stepper;
  }
}
