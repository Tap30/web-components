import { customElement } from 'lit/decorators.js';
import { HelmetsFillIcon } from './helmets-fill';

@customElement('tap-icon-helmets-fill')
export class TapIconHelmetsFill extends HelmetsFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-helmets-fill': TapIconHelmetsFill;
  }
}
