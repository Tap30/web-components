import { customElement } from 'lit/decorators.js';
import { ClockSmallIcon } from './clock-small';

@customElement('tap-icon-clock-small')
export class TapIconClockSmall extends ClockSmallIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-clock-small': TapIconClockSmall;
  }
}
