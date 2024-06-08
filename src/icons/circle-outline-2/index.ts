import { customElement } from 'lit/decorators.js';
import { CircleOutline2Icon } from './circle-outline-2';

@customElement('tap-icon-circle-outline-2')
export class TapIconCircleOutline2 extends CircleOutline2Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-outline-2': TapIconCircleOutline2;
  }
}
