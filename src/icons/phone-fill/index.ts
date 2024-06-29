import { customElement } from 'lit/decorators.js';
import { PhoneFillIcon } from './phone-fill';

@customElement('tap-icon-phone-fill')
export class TapIconPhoneFill extends PhoneFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-phone-fill': TapIconPhoneFill;
  }
}
