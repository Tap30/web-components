import { customElement } from 'lit/decorators.js';
import { AlarmClockIcon } from './alarm-clock';

@customElement('tap-icon-alarm-clock')
export class TapIconAlarmClock extends AlarmClockIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-alarm-clock': TapIconAlarmClock;
  }
}
