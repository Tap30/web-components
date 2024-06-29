import { customElement } from 'lit/decorators.js';
import { StarFillIcon } from './star-fill';

@customElement('tap-icon-star-fill')
export class TapIconStarFill extends StarFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-star-fill': TapIconStarFill;
  }
}
