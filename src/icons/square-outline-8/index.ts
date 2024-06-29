import { customElement } from 'lit/decorators.js';
import { SquareOutline8Icon } from './square-outline-8';

@customElement('tap-icon-square-outline-8')
export class TapIconSquareOutline8 extends SquareOutline8Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-outline-8': TapIconSquareOutline8;
  }
}
