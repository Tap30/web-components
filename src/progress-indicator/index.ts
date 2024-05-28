import { customElement } from 'lit/decorators.js';
import { ProgressIndicator } from './progress-indicator.js';
import styles from './progress-indicator.style.js';

@customElement('tap-progress-indicator')
export class TapProgressIndicator extends ProgressIndicator {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-progress-indicator': TapProgressIndicator;
  }
}
