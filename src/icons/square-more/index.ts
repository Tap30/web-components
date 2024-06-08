import { customElement } from 'lit/decorators.js';
import { SquareMoreIcon } from './square-more';

@customElement('tap-icon-square-more')
export class TapIconSquareMore extends SquareMoreIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-more': TapIconSquareMore;
  }
}
