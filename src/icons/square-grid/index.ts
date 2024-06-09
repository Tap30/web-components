import { customElement } from 'lit/decorators.js';
import { SquareGridIcon } from './square-grid';

@customElement('tap-icon-square-grid')
export class TapIconSquareGrid extends SquareGridIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-grid': TapIconSquareGrid;
  }
}
