import { customElement } from 'lit/decorators.js';
import { WalletFillIcon } from './wallet-fill';

@customElement('tap-icon-wallet-fill')
export class TapIconWalletFill extends WalletFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-wallet-fill': TapIconWalletFill;
  }
}
