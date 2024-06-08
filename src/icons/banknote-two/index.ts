import { customElement } from 'lit/decorators.js';
import { BanknoteTwoIcon } from './banknote-two';

@customElement('tap-icon-banknote-two')
export class TapIconBanknoteTwo extends BanknoteTwoIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-banknote-two': TapIconBanknoteTwo;
  }
}
