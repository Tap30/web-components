import { customElement } from 'lit/decorators.js';
import { SquareAboveSquaresIcon } from './square-above-squares';

@customElement('tap-icon-square-above-squares')
export class TapIconSquareAboveSquares extends SquareAboveSquaresIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-above-squares': TapIconSquareAboveSquares;
  }
}
