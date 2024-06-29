import { customElement } from 'lit/decorators.js';
import { CircleOutline4Icon } from './circle-outline-4';

@customElement('tap-icon-circle-outline-4')
export class TapIconCircleOutline4 extends CircleOutline4Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-outline-4': TapIconCircleOutline4;
  }
}
