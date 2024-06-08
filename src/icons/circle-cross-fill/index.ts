import { customElement } from 'lit/decorators.js';
import { CircleCrossFillIcon } from './circle-cross-fill';

@customElement('tap-icon-circle-cross-fill')
export class TapIconCircleCrossFill extends CircleCrossFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-cross-fill': TapIconCircleCrossFill;
  }
}
