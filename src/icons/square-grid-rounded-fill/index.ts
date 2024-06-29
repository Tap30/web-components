import { customElement } from 'lit/decorators.js';
import { SquareGridRoundedFillIcon } from './square-grid-rounded-fill';

@customElement('tap-icon-square-grid-rounded-fill')
export class TapIconSquareGridRoundedFill extends SquareGridRoundedFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-grid-rounded-fill': TapIconSquareGridRoundedFill;
  }
}
