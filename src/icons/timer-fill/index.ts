import { customElement } from 'lit/decorators.js';
import { TimerFillIcon } from './timer-fill';

@customElement('tap-icon-timer-fill')
export class TapIconTimerFill extends TimerFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-timer-fill': TapIconTimerFill;
  }
}
