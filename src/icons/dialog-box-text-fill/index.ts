import { customElement } from 'lit/decorators.js';
import { DialogBoxTextFillIcon } from './dialog-box-text-fill';

@customElement('tap-icon-dialog-box-text-fill')
export class TapIconDialogBoxTextFill extends DialogBoxTextFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-dialog-box-text-fill': TapIconDialogBoxTextFill;
  }
}
