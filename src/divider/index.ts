import { customElement } from 'lit/decorators.js';
import { Divider } from './divider.js';
import styles from './divider.style.js';

@customElement('tap-divider')
export class TapDivider extends Divider {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-divider': TapDivider;
  }
}
