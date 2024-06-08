import { customElement } from 'lit/decorators.js';
import { CircleMinusIcon } from './circle-minus';

@customElement('tap-icon-circle-minus')
export class TapIconCircleMinus extends CircleMinusIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-minus': TapIconCircleMinus;
  }
}
