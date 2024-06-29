import { customElement } from 'lit/decorators.js';
import { SquareOutline1Icon } from './square-outline-1';

@customElement('tap-icon-square-outline-1')
export class TapIconSquareOutline1 extends SquareOutline1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-outline-1': TapIconSquareOutline1;
  }
}
