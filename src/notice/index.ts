import { customElement } from 'lit/decorators.js';
import { Notice } from './notice';
import styles from './notice.style';

@customElement('tap-notice')
export class TapNotice extends Notice {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-notice': TapNotice;
  }
}
