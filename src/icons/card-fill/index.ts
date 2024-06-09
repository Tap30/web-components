import { customElement } from 'lit/decorators.js';
import { CardFillIcon } from './card-fill';

@customElement('tap-icon-card-fill')
export class TapIconCardFill extends CardFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-fill': TapIconCardFill;
  }
}
