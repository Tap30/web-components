import { customElement } from 'lit/decorators.js';
import { HourglassIcon } from './hourglass';

@customElement('tap-icon-hourglass')
export class TapIconHourglass extends HourglassIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-hourglass': TapIconHourglass;
  }
}
