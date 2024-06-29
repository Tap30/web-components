import { customElement } from 'lit/decorators.js';
import { Default5Icon } from './default-5';

@customElement('tap-icon-default-5')
export class TapIconDefault5 extends Default5Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-5': TapIconDefault5;
  }
}
