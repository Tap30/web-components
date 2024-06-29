import { customElement } from 'lit/decorators.js';
import { CircleMoreFillIcon } from './circle-more-fill';

@customElement('tap-icon-circle-more-fill')
export class TapIconCircleMoreFill extends CircleMoreFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-more-fill': TapIconCircleMoreFill;
  }
}
