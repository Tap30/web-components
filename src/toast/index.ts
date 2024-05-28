import { customElement } from 'lit/decorators.js';
import { Toast } from './toast';
import styles from './toast.style';
import { LitElement, html } from 'lit';

@customElement('tap-toast')
export class TapToast extends Toast {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-toast': TapToast;
  }
}
