import { customElement } from 'lit/decorators.js';
import { PinOnMapIcon } from './pin-on-map';

@customElement('tap-icon-pin-on-map')
export class TapIconPinOnMap extends PinOnMapIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pin-on-map': TapIconPinOnMap;
  }
}
