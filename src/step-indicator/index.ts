import { customElement } from 'lit/decorators.js';
import { StepIndicator } from './step-indicator.js';
import styles from './step-indicator.style.js';

/**
 * @summary A step indicator component.
 *
 * @prop {number} [steps=2] - The total number of steps. Defaults to 2.
 * @prop {number} [current=0] - The current step index. Defaults to 0.
 *
 * @csspart [steps] - The container for the steps.
 * @csspart [step] - Each individual step.
 *
 * @cssprop [--tap-step-indicator-step-size=--tap-sys-spacing-5] - The size of each step.
 * @cssprop [--tap-step-indicator-step-border-radius=--tap-sys-radius-full] - The border radius of each step.
 * @cssprop [--tap-step-indicator-step-border-color=--tap-sys-color-surface-primary] - The border color of each step.
 * @cssprop [--tap-step-indicator-step-background-color=--tap-sys-color-border-primary] - The background color of each step.
 *
 * @fires tap-step-indicator-change - Step indicator change event
 */
@customElement('tap-step-indicator')
export class TapStepIndicator extends StepIndicator {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-step-indicator': TapStepIndicator;
  }
}
