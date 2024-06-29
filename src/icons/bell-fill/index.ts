import { customElement } from 'lit/decorators.js';
import { BellFillIcon } from './bell-fill';

@customElement('tap-icon-bell-fill')
export class TapIconBellFill extends BellFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-bell-fill': TapIconBellFill;
  }
}
