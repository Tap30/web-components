import { customElement } from 'lit/decorators.js';
import { SquareGridFillIcon } from './square-grid-fill';

@customElement('tap-icon-square-grid-fill')
export class TapIconSquareGridFill extends SquareGridFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-grid-fill': TapIconSquareGridFill;
  }
}
