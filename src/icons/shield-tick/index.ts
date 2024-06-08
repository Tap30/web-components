import { customElement } from 'lit/decorators.js';
import { ShieldTickIcon } from './shield-tick';

@customElement('tap-icon-shield-tick')
export class TapIconShieldTick extends ShieldTickIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-shield-tick': TapIconShieldTick;
  }
}
