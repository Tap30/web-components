import { customElement } from 'lit/decorators.js';
import { Radio } from './radio';
import styles from './radio.style';

@customElement('tap-radio')
export class TapRadio extends Radio {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-radio': TapRadio;
  }
}
