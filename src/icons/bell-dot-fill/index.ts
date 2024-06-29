import { customElement } from 'lit/decorators.js';
import { BellDotFillIcon } from './bell-dot-fill';

@customElement('tap-icon-bell-dot-fill')
export class TapIconBellDotFill extends BellDotFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-bell-dot-fill': TapIconBellDotFill;
  }
}
