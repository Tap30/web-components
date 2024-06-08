import { customElement } from 'lit/decorators.js';
import { FaceSadIcon } from './face-sad';

@customElement('tap-icon-face-sad')
export class TapIconFaceSad extends FaceSadIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-face-sad': TapIconFaceSad;
  }
}
