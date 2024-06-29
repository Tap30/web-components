import { customElement } from 'lit/decorators.js';
import { SquareFill6Icon } from './square-fill-6';

@customElement('tap-icon-square-fill-6')
export class TapIconSquareFill6 extends SquareFill6Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill-6': TapIconSquareFill6;
  }
}
