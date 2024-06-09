import { customElement } from 'lit/decorators.js';
import { SquareOutline5Icon } from './square-outline-5';

@customElement('tap-icon-square-outline-5')
export class TapIconSquareOutline5 extends SquareOutline5Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-outline-5': TapIconSquareOutline5;
  }
}
