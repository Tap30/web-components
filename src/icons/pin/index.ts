import { customElement } from 'lit/decorators.js';
import { PinIcon } from './pin';

@customElement('tap-icon-pin')
export class TapIconPin extends PinIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pin': TapIconPin;
  }
}
