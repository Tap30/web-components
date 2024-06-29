import { customElement } from 'lit/decorators.js';
import { TelephoneIcon } from './telephone';

@customElement('tap-icon-telephone')
export class TapIconTelephone extends TelephoneIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-telephone': TapIconTelephone;
  }
}
