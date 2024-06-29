import { customElement } from 'lit/decorators.js';
import { ClockArrowCirclepathIcon } from './clock-arrow-circlepath';

@customElement('tap-icon-clock-arrow-circlepath')
export class TapIconClockArrowCirclepath extends ClockArrowCirclepathIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-clock-arrow-circlepath': TapIconClockArrowCirclepath;
  }
}
