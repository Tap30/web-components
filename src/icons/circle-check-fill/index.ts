import { customElement } from 'lit/decorators.js';
import { CircleCheckFillIcon } from './circle-check-fill';

@customElement('tap-icon-circle-check-fill')
export class TapIconCircleCheckFill extends CircleCheckFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-check-fill': TapIconCircleCheckFill;
  }
}
