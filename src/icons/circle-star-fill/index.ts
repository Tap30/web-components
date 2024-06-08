import { customElement } from 'lit/decorators.js';
import { CircleStarFillIcon } from './circle-star-fill';

@customElement('tap-icon-circle-star-fill')
export class TapIconCircleStarFill extends CircleStarFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-star-fill': TapIconCircleStarFill;
  }
}
