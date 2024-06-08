import { customElement } from 'lit/decorators.js';
import { SirenIcon } from './siren';

@customElement('tap-icon-siren')
export class TapIconSiren extends SirenIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-siren': TapIconSiren;
  }
}
