import { customElement } from 'lit/decorators.js';
import { PinOnMapFillIcon } from './pin-on-map-fill';

@customElement('tap-icon-pin-on-map-fill')
export class TapIconPinOnMapFill extends PinOnMapFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pin-on-map-fill': TapIconPinOnMapFill;
  }
}
