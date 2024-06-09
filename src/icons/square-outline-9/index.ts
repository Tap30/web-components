import { customElement } from 'lit/decorators.js';
import { SquareOutline9Icon } from './square-outline-9';

@customElement('tap-icon-square-outline-9')
export class TapIconSquareOutline9 extends SquareOutline9Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-outline-9': TapIconSquareOutline9;
  }
}
