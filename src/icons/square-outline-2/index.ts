import { customElement } from 'lit/decorators.js';
import { SquareOutline2Icon } from './square-outline-2';

@customElement('tap-icon-square-outline-2')
export class TapIconSquareOutline2 extends SquareOutline2Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-outline-2': TapIconSquareOutline2;
  }
}
