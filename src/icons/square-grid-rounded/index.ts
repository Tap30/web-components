import { customElement } from 'lit/decorators.js';
import { SquareGridRoundedIcon } from './square-grid-rounded';

@customElement('tap-icon-square-grid-rounded')
export class TapIconSquareGridRounded extends SquareGridRoundedIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-grid-rounded': TapIconSquareGridRounded;
  }
}
