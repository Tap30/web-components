import { customElement } from 'lit/decorators.js';
import { PersonWaveIcon } from './person-wave';

@customElement('tap-icon-person-wave')
export class TapIconPersonWave extends PersonWaveIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-wave': TapIconPersonWave;
  }
}
