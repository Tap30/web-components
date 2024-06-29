import { customElement } from 'lit/decorators.js';
import { SquareOutline4Icon } from './square-outline-4';

@customElement('tap-icon-square-outline-4')
export class TapIconSquareOutline4 extends SquareOutline4Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-outline-4': TapIconSquareOutline4;
  }
}
