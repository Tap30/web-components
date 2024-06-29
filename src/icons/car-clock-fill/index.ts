import { customElement } from 'lit/decorators.js';
import { CarClockFillIcon } from './car-clock-fill';

@customElement('tap-icon-car-clock-fill')
export class TapIconCarClockFill extends CarClockFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-car-clock-fill': TapIconCarClockFill;
  }
}
