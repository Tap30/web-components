import { customElement } from 'lit/decorators.js';
import { CircleFill4Icon } from './circle-fill-4';

@customElement('tap-icon-circle-fill-4')
export class TapIconCircleFill4 extends CircleFill4Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-fill-4': TapIconCircleFill4;
  }
}
