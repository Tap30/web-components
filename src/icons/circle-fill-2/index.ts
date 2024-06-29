import { customElement } from 'lit/decorators.js';
import { CircleFill2Icon } from './circle-fill-2';

@customElement('tap-icon-circle-fill-2')
export class TapIconCircleFill2 extends CircleFill2Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-fill-2': TapIconCircleFill2;
  }
}
