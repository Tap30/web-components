import { customElement } from 'lit/decorators.js';
import { HeartBrokenFillIcon } from './heart-broken-fill';

@customElement('tap-icon-heart-broken-fill')
export class TapIconHeartBrokenFill extends HeartBrokenFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-heart-broken-fill': TapIconHeartBrokenFill;
  }
}
