import { customElement } from 'lit/decorators.js';
import { PinWaveIcon } from './pin-wave';

@customElement('tap-icon-pin-wave')
export class TapIconPinWave extends PinWaveIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pin-wave': TapIconPinWave;
  }
}
