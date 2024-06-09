import { customElement } from 'lit/decorators.js';
import { CircleFill1Icon } from './circle-fill-1';

@customElement('tap-icon-circle-fill-1')
export class TapIconCircleFill1 extends CircleFill1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-fill-1': TapIconCircleFill1;
  }
}
