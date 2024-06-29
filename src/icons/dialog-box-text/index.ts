import { customElement } from 'lit/decorators.js';
import { DialogBoxTextIcon } from './dialog-box-text';

@customElement('tap-icon-dialog-box-text')
export class TapIconDialogBoxText extends DialogBoxTextIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-dialog-box-text': TapIconDialogBoxText;
  }
}
