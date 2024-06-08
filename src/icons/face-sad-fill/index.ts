import { customElement } from 'lit/decorators.js';
import { FaceSadFillIcon } from './face-sad-fill';

@customElement('tap-icon-face-sad-fill')
export class TapIconFaceSadFill extends FaceSadFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-face-sad-fill': TapIconFaceSadFill;
  }
}
