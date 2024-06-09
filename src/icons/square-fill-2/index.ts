import { customElement } from 'lit/decorators.js';
import { SquareFill2Icon } from './square-fill-2';

@customElement('tap-icon-square-fill-2')
export class TapIconSquareFill2 extends SquareFill2Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill-2': TapIconSquareFill2;
  }
}
