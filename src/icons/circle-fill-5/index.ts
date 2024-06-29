import { customElement } from 'lit/decorators.js';
import { CircleFill5Icon } from './circle-fill-5';

@customElement('tap-icon-circle-fill-5')
export class TapIconCircleFill5 extends CircleFill5Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-fill-5': TapIconCircleFill5;
  }
}
