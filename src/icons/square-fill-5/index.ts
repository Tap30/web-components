import { customElement } from 'lit/decorators.js';
import { SquareFill5Icon } from './square-fill-5';

@customElement('tap-icon-square-fill-5')
export class TapIconSquareFill5 extends SquareFill5Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill-5': TapIconSquareFill5;
  }
}
