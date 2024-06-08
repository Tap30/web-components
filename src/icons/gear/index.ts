import { customElement } from 'lit/decorators.js';
import { GearIcon } from './gear';

@customElement('tap-icon-gear')
export class TapIconGear extends GearIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-gear': TapIconGear;
  }
}
