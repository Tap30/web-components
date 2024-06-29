import { customElement } from 'lit/decorators.js';
import { GearFillIcon } from './gear-fill';

@customElement('tap-icon-gear-fill')
export class TapIconGearFill extends GearFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-gear-fill': TapIconGearFill;
  }
}
