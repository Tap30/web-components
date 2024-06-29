import { customElement } from 'lit/decorators.js';
import { CallDialogBoxIcon } from './call-dialog-box';

@customElement('tap-icon-call-dialog-box')
export class TapIconCallDialogBox extends CallDialogBoxIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-call-dialog-box': TapIconCallDialogBox;
  }
}
