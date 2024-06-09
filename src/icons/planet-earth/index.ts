import { customElement } from 'lit/decorators.js';
import { PlanetEarthIcon } from './planet-earth';

@customElement('tap-icon-planet-earth')
export class TapIconPlanetEarth extends PlanetEarthIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-planet-earth': TapIconPlanetEarth;
  }
}
