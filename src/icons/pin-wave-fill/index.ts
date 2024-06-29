import { customElement } from 'lit/decorators.js';
import { PinWaveFillIcon } from './pin-wave-fill';

@customElement('tap-icon-pin-wave-fill')
export class TapIconPinWaveFill extends PinWaveFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pin-wave-fill': TapIconPinWaveFill;
  }
}
