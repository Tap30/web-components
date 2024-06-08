import { customElement } from 'lit/decorators.js';
import { StoreIcon } from './store';

@customElement('tap-icon-store')
export class TapIconStore extends StoreIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-store': TapIconStore;
  }
}
