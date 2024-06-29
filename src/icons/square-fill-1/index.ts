import { customElement } from 'lit/decorators.js';
import { SquareFill1Icon } from './square-fill-1';

@customElement('tap-icon-square-fill-1')
export class TapIconSquareFill1 extends SquareFill1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill-1': TapIconSquareFill1;
  }
}
