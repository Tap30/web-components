import { customElement } from 'lit/decorators.js';
import { SquareOutline6Icon } from './square-outline-6';

@customElement('tap-icon-square-outline-6')
export class TapIconSquareOutline6 extends SquareOutline6Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-outline-6': TapIconSquareOutline6;
  }
}
