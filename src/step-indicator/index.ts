import { customElement } from 'lit/decorators.js';
import { StepIndicator } from './step-indicator.js';
import styles from './step-indicator.style.js';

@customElement('tap-step-indicator')
export class TapStepIndicator extends StepIndicator {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-step-indicator': TapStepIndicator;
  }
}
