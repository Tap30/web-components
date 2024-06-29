import { customElement } from 'lit/decorators.js';
import { Default8Icon } from './default-8';

@customElement('tap-icon-default-8')
export class TapIconDefault8 extends Default8Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-8': TapIconDefault8;
  }
}
