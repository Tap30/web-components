import { customElement } from 'lit/decorators.js';
import { CirclePersonFill1Icon } from './circle-person-fill-1';

@customElement('tap-icon-circle-person-fill-1')
export class TapIconCirclePersonFill1 extends CirclePersonFill1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-person-fill-1': TapIconCirclePersonFill1;
  }
}
