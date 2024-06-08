import { customElement } from 'lit/decorators.js';
import { CircleFill9Icon } from './circle-fill-9';

@customElement('tap-icon-circle-fill-9')
export class TapIconCircleFill9 extends CircleFill9Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-fill-9': TapIconCircleFill9;
  }
}
