import { customElement } from 'lit/decorators.js';
import { SquareOutline3Icon } from './square-outline-3';

@customElement('tap-icon-square-outline-3')
export class TapIconSquareOutline3 extends SquareOutline3Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-outline-3': TapIconSquareOutline3;
  }
}
