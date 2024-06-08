import { customElement } from 'lit/decorators.js';
import { CircleOutline3Icon } from './circle-outline-3';

@customElement('tap-icon-circle-outline-3')
export class TapIconCircleOutline3 extends CircleOutline3Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-outline-3': TapIconCircleOutline3;
  }
}
