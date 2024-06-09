import { customElement } from 'lit/decorators.js';
import { CirclePlusFillIcon } from './circle-plus-fill';

@customElement('tap-icon-circle-plus-fill')
export class TapIconCirclePlusFill extends CirclePlusFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-plus-fill': TapIconCirclePlusFill;
  }
}
