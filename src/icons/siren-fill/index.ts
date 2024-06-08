import { customElement } from 'lit/decorators.js';
import { SirenFillIcon } from './siren-fill';

@customElement('tap-icon-siren-fill')
export class TapIconSirenFill extends SirenFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-siren-fill': TapIconSirenFill;
  }
}
