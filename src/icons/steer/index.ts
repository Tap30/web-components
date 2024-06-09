import { customElement } from 'lit/decorators.js';
import { SteerIcon } from './steer';

@customElement('tap-icon-steer')
export class TapIconSteer extends SteerIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-steer': TapIconSteer;
  }
}
