import { customElement } from 'lit/decorators.js';
import { CircleOutline9Icon } from './circle-outline-9';

@customElement('tap-icon-circle-outline-9')
export class TapIconCircleOutline9 extends CircleOutline9Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-outline-9': TapIconCircleOutline9;
  }
}
