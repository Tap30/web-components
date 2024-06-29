import { customElement } from 'lit/decorators.js';
import { SquareFourIcon } from './square-four';

@customElement('tap-icon-square-four')
export class TapIconSquareFour extends SquareFourIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-four': TapIconSquareFour;
  }
}
