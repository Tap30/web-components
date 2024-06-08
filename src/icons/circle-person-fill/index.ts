import { customElement } from 'lit/decorators.js';
import { CirclePersonFillIcon } from './circle-person-fill';

@customElement('tap-icon-circle-person-fill')
export class TapIconCirclePersonFill extends CirclePersonFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-person-fill': TapIconCirclePersonFill;
  }
}
