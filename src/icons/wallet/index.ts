import { customElement } from 'lit/decorators.js';
import { WalletIcon } from './wallet';

@customElement('tap-icon-wallet')
export class TapIconWallet extends WalletIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-wallet': TapIconWallet;
  }
}
