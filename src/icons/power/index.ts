import { customElement } from 'lit/decorators.js';
import { PowerIcon } from './power';

@customElement('tap-icon-power')
export class TapIconPower extends PowerIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-power': TapIconPower;
  }
}
