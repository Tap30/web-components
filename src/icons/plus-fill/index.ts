import { customElement } from 'lit/decorators.js';
import { PlusFillIcon } from './plus-fill';

@customElement('tap-icon-plus-fill')
export class TapIconPlusFill extends PlusFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-plus-fill': TapIconPlusFill;
  }
}
