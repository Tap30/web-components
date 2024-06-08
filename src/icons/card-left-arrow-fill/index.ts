import { customElement } from 'lit/decorators.js';
import { CardLeftArrowFillIcon } from './card-left-arrow-fill';

@customElement('tap-icon-card-left-arrow-fill')
export class TapIconCardLeftArrowFill extends CardLeftArrowFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-left-arrow-fill': TapIconCardLeftArrowFill;
  }
}
