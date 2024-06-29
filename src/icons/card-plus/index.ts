import { customElement } from 'lit/decorators.js';
import { CardPlusIcon } from './card-plus';

@customElement('tap-icon-card-plus')
export class TapIconCardPlus extends CardPlusIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-plus': TapIconCardPlus;
  }
}
