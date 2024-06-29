import { customElement } from 'lit/decorators.js';
import { EyeIcon } from './eye';

@customElement('tap-icon-eye')
export class TapIconEye extends EyeIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-eye': TapIconEye;
  }
}
