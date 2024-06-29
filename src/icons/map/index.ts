import { customElement } from 'lit/decorators.js';
import { MapIcon } from './map';

@customElement('tap-icon-map')
export class TapIconMap extends MapIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-map': TapIconMap;
  }
}
