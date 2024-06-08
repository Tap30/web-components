import { customElement } from 'lit/decorators.js';
import { SquareOutline7Icon } from './square-outline-7';

@customElement('tap-icon-square-outline-7')
export class TapIconSquareOutline7 extends SquareOutline7Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-outline-7': TapIconSquareOutline7;
  }
}
