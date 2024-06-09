import { customElement } from 'lit/decorators.js';
import { CardLeftArrowIcon } from './card-left-arrow';

@customElement('tap-icon-card-left-arrow')
export class TapIconCardLeftArrow extends CardLeftArrowIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-left-arrow': TapIconCardLeftArrow;
  }
}
