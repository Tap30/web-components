import { customElement } from 'lit/decorators.js';
import { FireFillIcon } from './fire-fill';

@customElement('tap-icon-fire-fill')
export class TapIconFireFill extends FireFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-fire-fill': TapIconFireFill;
  }
}
