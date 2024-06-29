import { customElement } from 'lit/decorators.js';
import { Modal } from './modal';
import styles from './modal.style';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-modal></tap-modal>
 * ```
 *
 * ##### Open Modal
 *
 * ```html
 * <tap-modal open></tap-modal>
 * ```
 *
 * @summary A modal dialog component.
 *
 * @prop {boolean} [open=false] - Indicates whether the modal is open.
 *
 * @csspart [overlay] - The overlay background when the modal is open.
 * @csspart [dialog] - The main container for the modal dialog.
 *
 * @cssprop [--tap-dialog-color-surface-overlay=--tap-sys-color-surface-overlay-dark] - The background color of the overlay.
 * @cssprop [--tap-dialog-color-surface-primary=--tap-sys-color-surface-primary] - The background color of the modal dialog.
 * @cssprop [--tap-dialog-padding=--tap-sys-spacing-6] - The padding inside the modal dialog.
 * @cssprop [--tap-dialog-radius=--tap-sys-radius-6] - The border radius of the modal dialog.
 *
 */
@customElement('tap-modal')
export class TapModal extends Modal {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-modal': TapModal;
  }
}
