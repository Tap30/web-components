import { customElement } from 'lit/decorators.js';
import { CircleFill8Icon } from './circle-fill-8';

@customElement('tap-icon-circle-fill-8')
export class TapIconCircleFill8 extends CircleFill8Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-fill-8': TapIconCircleFill8;
  }
}
