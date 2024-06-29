import { customElement } from 'lit/decorators.js';
import { BuildingFillIcon } from './building-fill';

@customElement('tap-icon-building-fill')
export class TapIconBuildingFill extends BuildingFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-building-fill': TapIconBuildingFill;
  }
}
