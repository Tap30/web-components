import { customElement } from 'lit/decorators.js';
import { GasStationFillIcon } from './gas-station-fill';

@customElement('tap-icon-gas-station-fill')
export class TapIconGasStationFill extends GasStationFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-gas-station-fill': TapIconGasStationFill;
  }
}
