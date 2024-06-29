import { customElement } from 'lit/decorators.js';
import { CircleThunderFillIcon } from './circle-thunder-fill';

@customElement('tap-icon-circle-thunder-fill')
export class TapIconCircleThunderFill extends CircleThunderFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-thunder-fill': TapIconCircleThunderFill;
  }
}
