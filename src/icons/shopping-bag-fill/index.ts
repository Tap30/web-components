import { customElement } from 'lit/decorators.js';
import { ShoppingBagFillIcon } from './shopping-bag-fill';

@customElement('tap-icon-shopping-bag-fill')
export class TapIconShoppingBagFill extends ShoppingBagFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-shopping-bag-fill': TapIconShoppingBagFill;
  }
}
