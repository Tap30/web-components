import { customElement } from 'lit/decorators.js';
import { CircleOutline8Icon } from './circle-outline-8';

@customElement('tap-icon-circle-outline-8')
export class TapIconCircleOutline8 extends CircleOutline8Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-outline-8': TapIconCircleOutline8;
  }
}
