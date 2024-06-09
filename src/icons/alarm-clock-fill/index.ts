import { customElement } from 'lit/decorators.js';
import { AlarmClockFillIcon } from './alarm-clock-fill';

@customElement('tap-icon-alarm-clock-fill')
export class TapIconAlarmClockFill extends AlarmClockFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-alarm-clock-fill': TapIconAlarmClockFill;
  }
}
