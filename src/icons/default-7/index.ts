import { customElement } from 'lit/decorators.js';
import { Default7Icon } from './default-7';

@customElement('tap-icon-default-7')
export class TapIconDefault7 extends Default7Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-7': TapIconDefault7;
  }
}
