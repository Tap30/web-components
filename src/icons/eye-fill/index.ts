import { customElement } from 'lit/decorators.js';
import { EyeFillIcon } from './eye-fill';

@customElement('tap-icon-eye-fill')
export class TapIconEyeFill extends EyeFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-eye-fill': TapIconEyeFill;
  }
}
