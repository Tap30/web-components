import { customElement } from 'lit/decorators.js';
import { CardRightArrowFillIcon } from './card-right-arrow-fill';

@customElement('tap-icon-card-right-arrow-fill')
export class TapIconCardRightArrowFill extends CardRightArrowFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-right-arrow-fill': TapIconCardRightArrowFill;
  }
}
