import { customElement } from 'lit/decorators.js';
import { SquareFill3Icon } from './square-fill-3';

@customElement('tap-icon-square-fill-3')
export class TapIconSquareFill3 extends SquareFill3Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill-3': TapIconSquareFill3;
  }
}
