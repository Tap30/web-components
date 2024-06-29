import { customElement } from 'lit/decorators.js';
import { BanknoteTwoFillIcon } from './banknote-two-fill';

@customElement('tap-icon-banknote-two-fill')
export class TapIconBanknoteTwoFill extends BanknoteTwoFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-banknote-two-fill': TapIconBanknoteTwoFill;
  }
}
