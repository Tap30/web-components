import { customElement } from 'lit/decorators.js';
import { TrafficLightIcon } from './traffic-light';

@customElement('tap-icon-traffic-light')
export class TapIconTrafficLight extends TrafficLightIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-traffic-light': TapIconTrafficLight;
  }
}
