import { customElement } from 'lit/decorators.js';
import { SquareFill8Icon } from './square-fill-8';

@customElement('tap-icon-square-fill-8')
export class TapIconSquareFill8 extends SquareFill8Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill-8': TapIconSquareFill8;
  }
}
