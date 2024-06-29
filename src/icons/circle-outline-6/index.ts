import { customElement } from 'lit/decorators.js';
import { CircleOutline6Icon } from './circle-outline-6';

@customElement('tap-icon-circle-outline-6')
export class TapIconCircleOutline6 extends CircleOutline6Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-outline-6': TapIconCircleOutline6;
  }
}
