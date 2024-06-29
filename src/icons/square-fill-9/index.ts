import { customElement } from 'lit/decorators.js';
import { SquareFill9Icon } from './square-fill-9';

@customElement('tap-icon-square-fill-9')
export class TapIconSquareFill9 extends SquareFill9Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill-9': TapIconSquareFill9;
  }
}
