import { customElement } from 'lit/decorators.js';
import { HeadphoneFillIcon } from './headphone-fill';

@customElement('tap-icon-headphone-fill')
export class TapIconHeadphoneFill extends HeadphoneFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-headphone-fill': TapIconHeadphoneFill;
  }
}
