import { customElement } from 'lit/decorators.js';
import { BanknoteFillIcon } from './banknote-fill';

@customElement('tap-icon-banknote-fill')
export class TapIconBanknoteFill extends BanknoteFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-banknote-fill': TapIconBanknoteFill;
  }
}
