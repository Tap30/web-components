import { customElement } from 'lit/decorators.js';
import { PersonWaveFillIcon } from './person-wave-fill';

@customElement('tap-icon-person-wave-fill')
export class TapIconPersonWaveFill extends PersonWaveFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-wave-fill': TapIconPersonWaveFill;
  }
}
