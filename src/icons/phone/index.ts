import { customElement } from 'lit/decorators.js';
import { PhoneIcon } from './phone';

@customElement('tap-icon-phone')
export class TapIconPhone extends PhoneIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-phone': TapIconPhone;
  }
}
