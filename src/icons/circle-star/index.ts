import { customElement } from 'lit/decorators.js';
import { CircleStarIcon } from './circle-star';

@customElement('tap-icon-circle-star')
export class TapIconCircleStar extends CircleStarIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-star': TapIconCircleStar;
  }
}
