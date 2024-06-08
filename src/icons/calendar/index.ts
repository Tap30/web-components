import { customElement } from 'lit/decorators.js';
import { CalendarIcon } from './calendar';

@customElement('tap-icon-calendar')
export class TapIconCalendar extends CalendarIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-calendar': TapIconCalendar;
  }
}
