import { customElement } from 'lit/decorators.js';
import { HeadphoneIcon } from './headphone';

@customElement('tap-icon-headphone')
export class TapIconHeadphone extends HeadphoneIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-headphone': TapIconHeadphone;
  }
}
