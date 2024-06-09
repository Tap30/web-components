import { customElement } from 'lit/decorators.js';
import { HourglassFillIcon } from './hourglass-fill';

@customElement('tap-icon-hourglass-fill')
export class TapIconHourglassFill extends HourglassFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-hourglass-fill': TapIconHourglassFill;
  }
}
