import { customElement } from 'lit/decorators.js';
import { CardPlusFillIcon } from './card-plus-fill';

@customElement('tap-icon-card-plus-fill')
export class TapIconCardPlusFill extends CardPlusFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-plus-fill': TapIconCardPlusFill;
  }
}
