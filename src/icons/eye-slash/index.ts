import { customElement } from 'lit/decorators.js';
import { EyeSlashIcon } from './eye-slash';

@customElement('tap-icon-eye-slash')
export class TapIconEyeSlash extends EyeSlashIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-eye-slash': TapIconEyeSlash;
  }
}
