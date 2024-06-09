import { customElement } from 'lit/decorators.js';
import { CircleFill3Icon } from './circle-fill-3';

@customElement('tap-icon-circle-fill-3')
export class TapIconCircleFill3 extends CircleFill3Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-fill-3': TapIconCircleFill3;
  }
}
