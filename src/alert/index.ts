import { customElement } from 'lit/decorators.js';
import { Alert } from './alert';
import styles from './alert.style';

@customElement('tap-alert')
export class TapToast extends Alert {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-alert': TapToast;
  }
}
