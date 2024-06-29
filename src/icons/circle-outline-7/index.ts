import { customElement } from 'lit/decorators.js';
import { CircleOutline7Icon } from './circle-outline-7';

@customElement('tap-icon-circle-outline-7')
export class TapIconCircleOutline7 extends CircleOutline7Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-outline-7': TapIconCircleOutline7;
  }
}
