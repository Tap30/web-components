import { customElement } from 'lit/decorators.js';
import { PhoneVibrateFillIcon } from './phone-vibrate-fill';

@customElement('tap-icon-phone-vibrate-fill')
export class TapIconPhoneVibrateFill extends PhoneVibrateFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-phone-vibrate-fill': TapIconPhoneVibrateFill;
  }
}
