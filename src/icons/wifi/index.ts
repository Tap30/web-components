import { customElement } from 'lit/decorators.js';
import { WifiIcon } from './wifi';

@customElement('tap-icon-wifi')
export class TapIconWifi extends WifiIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-wifi': TapIconWifi;
  }
}
