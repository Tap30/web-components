import { customElement } from 'lit/decorators.js';
import { ClockSmallFillIcon } from './clock-small-fill';

@customElement('tap-icon-clock-small-fill')
export class TapIconClockSmallFill extends ClockSmallFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-clock-small-fill': TapIconClockSmallFill;
  }
}
