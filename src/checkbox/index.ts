import { customElement } from 'lit/decorators.js';
import { Checkbox } from './checkbox';
import styles from './checkbox.style';

@customElement('tap-checkbox')
export class TapCheckbox extends Checkbox {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-checkbox': TapCheckbox;
  }
}
