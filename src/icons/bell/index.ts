import { customElement } from 'lit/decorators.js';
import { BellIcon } from './bell';

@customElement('tap-icon-bell')
export class TapIconBell extends BellIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-bell': TapIconBell;
  }
}
