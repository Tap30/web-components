import { customElement } from 'lit/decorators.js';
import { SquareMoreFillIcon } from './square-more-fill';

@customElement('tap-icon-square-more-fill')
export class TapIconSquareMoreFill extends SquareMoreFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-more-fill': TapIconSquareMoreFill;
  }
}
