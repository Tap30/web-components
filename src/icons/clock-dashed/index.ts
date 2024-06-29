import { customElement } from 'lit/decorators.js';
import { ClockDashedIcon } from './clock-dashed';

@customElement('tap-icon-clock-dashed')
export class TapIconClockDashed extends ClockDashedIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-clock-dashed': TapIconClockDashed;
  }
}
