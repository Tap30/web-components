import { customElement } from 'lit/decorators.js';
import { CircleCheckSmallFillIcon } from './circle-check-small-fill';

@customElement('tap-icon-circle-check-small-fill')
export class TapIconCircleCheckSmallFill extends CircleCheckSmallFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-check-small-fill': TapIconCircleCheckSmallFill;
  }
}
