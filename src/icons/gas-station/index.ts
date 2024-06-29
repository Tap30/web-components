import { customElement } from 'lit/decorators.js';
import { GasStationIcon } from './gas-station';

@customElement('tap-icon-gas-station')
export class TapIconGasStation extends GasStationIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-gas-station': TapIconGasStation;
  }
}
