import { customElement } from 'lit/decorators.js';
import { TextField } from './text-field';
import styles from './text-field.style';

@customElement('tap-text-field')
export class TapTextField extends TextField {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-text-field': TapTextField;
  }
}
