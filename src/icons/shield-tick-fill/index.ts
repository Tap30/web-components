import { customElement } from 'lit/decorators.js';
import { ShieldTickFillIcon } from './shield-tick-fill';

@customElement('tap-icon-shield-tick-fill')
export class TapIconShieldTickFill extends ShieldTickFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-shield-tick-fill': TapIconShieldTickFill;
  }
}
