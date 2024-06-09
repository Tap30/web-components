import { customElement } from 'lit/decorators.js';
import { SpiralDotTwoIcon } from './spiral-dot-two';

@customElement('tap-icon-spiral-dot-two')
export class TapIconSpiralDotTwo extends SpiralDotTwoIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-spiral-dot-two': TapIconSpiralDotTwo;
  }
}
