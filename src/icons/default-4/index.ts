import { customElement } from 'lit/decorators.js';
import { Default4Icon } from './default-4';

@customElement('tap-icon-default-4')
export class TapIconDefault4 extends Default4Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-4': TapIconDefault4;
  }
}
