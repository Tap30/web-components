import { customElement } from 'lit/decorators.js';
import { ShoppingCartIcon } from './shopping-cart';

@customElement('tap-icon-shopping-cart')
export class TapIconShoppingCart extends ShoppingCartIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-shopping-cart': TapIconShoppingCart;
  }
}
