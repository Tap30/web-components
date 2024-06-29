import { customElement } from 'lit/decorators.js';
import { CircleOutline1Icon } from './circle-outline-1';

@customElement('tap-icon-circle-outline-1')
export class TapIconCircleOutline1 extends CircleOutline1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-outline-1': TapIconCircleOutline1;
  }
}
