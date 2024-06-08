import { customElement } from 'lit/decorators.js';
import { SteerFillIcon } from './steer-fill';

@customElement('tap-icon-steer-fill')
export class TapIconSteerFill extends SteerFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-steer-fill': TapIconSteerFill;
  }
}
