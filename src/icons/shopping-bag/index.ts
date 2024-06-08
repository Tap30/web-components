import { customElement } from 'lit/decorators.js';
import { ShoppingBagIcon } from './shopping-bag';

@customElement('tap-icon-shopping-bag')
export class TapIconShoppingBag extends ShoppingBagIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-shopping-bag': TapIconShoppingBag;
  }
}
