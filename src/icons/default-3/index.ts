import { customElement } from 'lit/decorators.js';
import { Default3Icon } from './default-3';

@customElement('tap-icon-default-3')
export class TapIconDefault3 extends Default3Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-3': TapIconDefault3;
  }
}
