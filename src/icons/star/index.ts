import { customElement } from 'lit/decorators.js';
import { StarIcon } from './star';

@customElement('tap-icon-star')
export class TapIconStar extends StarIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-star': TapIconStar;
  }
}
