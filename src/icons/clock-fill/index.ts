import { customElement } from 'lit/decorators.js';
import { ClockFillIcon } from './clock-fill';

@customElement('tap-icon-clock-fill')
export class TapIconClockFill extends ClockFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-clock-fill': TapIconClockFill;
  }
}
