import { customElement } from 'lit/decorators.js';
import { ShoppingCartFillIcon } from './shopping-cart-fill';

@customElement('tap-icon-shopping-cart-fill')
export class TapIconShoppingCartFill extends ShoppingCartFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-shopping-cart-fill': TapIconShoppingCartFill;
  }
}
