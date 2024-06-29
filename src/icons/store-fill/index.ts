import { customElement } from 'lit/decorators.js';
import { StoreFillIcon } from './store-fill';

@customElement('tap-icon-store-fill')
export class TapIconStoreFill extends StoreFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-store-fill': TapIconStoreFill;
  }
}
