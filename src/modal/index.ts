import { customElement } from 'lit/decorators.js';
import { Modal } from './modal';
import styles from './modal.style';

@customElement('tap-modal')
export class TapModal extends Modal {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-modal': TapModal;
  }
}
