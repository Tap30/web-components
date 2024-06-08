import { customElement } from 'lit/decorators.js';
import { CircleCheckSmallIcon } from './circle-check-small';

@customElement('tap-icon-circle-check-small')
export class TapIconCircleCheckSmall extends CircleCheckSmallIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-check-small': TapIconCircleCheckSmall;
  }
}
