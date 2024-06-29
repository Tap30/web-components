import { customElement } from 'lit/decorators.js';
import { EyeSlashFillIcon } from './eye-slash-fill';

@customElement('tap-icon-eye-slash-fill')
export class TapIconEyeSlashFill extends EyeSlashFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-eye-slash-fill': TapIconEyeSlashFill;
  }
}
