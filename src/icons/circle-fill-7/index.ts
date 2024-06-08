import { customElement } from 'lit/decorators.js';
import { CircleFill7Icon } from './circle-fill-7';

@customElement('tap-icon-circle-fill-7')
export class TapIconCircleFill7 extends CircleFill7Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-fill-7': TapIconCircleFill7;
  }
}
