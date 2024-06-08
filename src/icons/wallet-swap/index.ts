import { customElement } from 'lit/decorators.js';
import { WalletSwapIcon } from './wallet-swap';

@customElement('tap-icon-wallet-swap')
export class TapIconWalletSwap extends WalletSwapIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-wallet-swap': TapIconWalletSwap;
  }
}
