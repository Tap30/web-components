import { customElement } from 'lit/decorators.js';
import { SquareFill7Icon } from './square-fill-7';

@customElement('tap-icon-square-fill-7')
export class TapIconSquareFill7 extends SquareFill7Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill-7': TapIconSquareFill7;
  }
}
