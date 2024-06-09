import { customElement } from 'lit/decorators.js';
import { BuildingIcon } from './building';

@customElement('tap-icon-building')
export class TapIconBuilding extends BuildingIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-building': TapIconBuilding;
  }
}
