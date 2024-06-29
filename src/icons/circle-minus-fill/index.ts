import { customElement } from 'lit/decorators.js';
import { CircleMinusFillIcon } from './circle-minus-fill';

@customElement('tap-icon-circle-minus-fill')
export class TapIconCircleMinusFill extends CircleMinusFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-minus-fill': TapIconCircleMinusFill;
  }
}
