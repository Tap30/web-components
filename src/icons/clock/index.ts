import { customElement } from 'lit/decorators.js';
import { ClockIcon } from './clock';

@customElement('tap-icon-clock')
export class TapIconClock extends ClockIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-clock': TapIconClock;
  }
}
