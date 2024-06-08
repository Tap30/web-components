import { customElement } from 'lit/decorators.js';
import { Default9Icon } from './default-9';

@customElement('tap-icon-default-9')
export class TapIconDefault9 extends Default9Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-9': TapIconDefault9;
  }
}
