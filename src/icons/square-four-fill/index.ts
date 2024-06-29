import { customElement } from 'lit/decorators.js';
import { SquareFourFillIcon } from './square-four-fill';

@customElement('tap-icon-square-four-fill')
export class TapIconSquareFourFill extends SquareFourFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-four-fill': TapIconSquareFourFill;
  }
}
