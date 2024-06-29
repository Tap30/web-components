import { customElement } from 'lit/decorators.js';
import { Default6Icon } from './default-6';

@customElement('tap-icon-default-6')
export class TapIconDefault6 extends Default6Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-6': TapIconDefault6;
  }
}
