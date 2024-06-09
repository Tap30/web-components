import { customElement } from 'lit/decorators.js';
import { SquareFill4Icon } from './square-fill-4';

@customElement('tap-icon-square-fill-4')
export class TapIconSquareFill4 extends SquareFill4Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill-4': TapIconSquareFill4;
  }
}
