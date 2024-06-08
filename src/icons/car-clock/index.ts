import { customElement } from 'lit/decorators.js';
import { CarClockIcon } from './car-clock';

@customElement('tap-icon-car-clock')
export class TapIconCarClock extends CarClockIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-car-clock': TapIconCarClock;
  }
}
