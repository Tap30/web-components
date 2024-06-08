import { customElement } from 'lit/decorators.js';
import { PhoneVibrateIcon } from './phone-vibrate';

@customElement('tap-icon-phone-vibrate')
export class TapIconPhoneVibrate extends PhoneVibrateIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-phone-vibrate': TapIconPhoneVibrate;
  }
}
