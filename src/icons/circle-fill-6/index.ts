import { customElement } from 'lit/decorators.js';
import { CircleFill6Icon } from './circle-fill-6';

@customElement('tap-icon-circle-fill-6')
export class TapIconCircleFill6 extends CircleFill6Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-fill-6': TapIconCircleFill6;
  }
}
