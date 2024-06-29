import { customElement } from 'lit/decorators.js';
import { TrafficLightFillIcon } from './traffic-light-fill';

@customElement('tap-icon-traffic-light-fill')
export class TapIconTrafficLightFill extends TrafficLightFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-traffic-light-fill': TapIconTrafficLightFill;
  }
}
