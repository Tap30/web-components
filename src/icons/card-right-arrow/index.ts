import { customElement } from 'lit/decorators.js';
import { CardRightArrowIcon } from './card-right-arrow';

@customElement('tap-icon-card-right-arrow')
export class TapIconCardRightArrow extends CardRightArrowIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-right-arrow': TapIconCardRightArrow;
  }
}
