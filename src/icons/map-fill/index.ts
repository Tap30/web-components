import { customElement } from 'lit/decorators.js';
import { MapFillIcon } from './map-fill';

@customElement('tap-icon-map-fill')
export class TapIconMapFill extends MapFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-map-fill': TapIconMapFill;
  }
}
