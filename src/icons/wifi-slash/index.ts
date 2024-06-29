import { customElement } from 'lit/decorators.js';
import { WifiSlashIcon } from './wifi-slash';

@customElement('tap-icon-wifi-slash')
export class TapIconWifiSlash extends WifiSlashIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-wifi-slash': TapIconWifiSlash;
  }
}
