import { customElement } from 'lit/decorators.js';
import { CircleOutline5Icon } from './circle-outline-5';

@customElement('tap-icon-circle-outline-5')
export class TapIconCircleOutline5 extends CircleOutline5Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-outline-5': TapIconCircleOutline5;
  }
}
