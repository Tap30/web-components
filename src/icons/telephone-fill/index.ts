import { customElement } from 'lit/decorators.js';
import { TelephoneFillIcon } from './telephone-fill';

@customElement('tap-icon-telephone-fill')
export class TapIconTelephoneFill extends TelephoneFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-telephone-fill': TapIconTelephoneFill;
  }
}
