import { customElement } from 'lit/decorators.js';
import { CalendarFillIcon } from './calendar-fill';

@customElement('tap-icon-calendar-fill')
export class TapIconCalendarFill extends CalendarFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-calendar-fill': TapIconCalendarFill;
  }
}
