import { customElement } from 'lit/decorators.js';
import { SquarePersonFillIcon } from './square-person-fill';

@customElement('tap-icon-square-person-fill')
export class TapIconSquarePersonFill extends SquarePersonFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-person-fill': TapIconSquarePersonFill;
  }
}
