import { customElement } from 'lit/decorators.js';
import { SquareFillIcon } from './square-fill';

@customElement('tap-icon-square-fill')
export class TapIconSquareFill extends SquareFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-fill': TapIconSquareFill;
  }
}
