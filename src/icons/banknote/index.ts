import { customElement } from 'lit/decorators.js';
import { BanknoteIcon } from './banknote';

@customElement('tap-icon-banknote')
export class TapIconBanknote extends BanknoteIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-banknote': TapIconBanknote;
  }
}
