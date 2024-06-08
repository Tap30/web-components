import { customElement } from 'lit/decorators.js';
import { CirclePlusIcon } from './circle-plus';

@customElement('tap-icon-circle-plus')
export class TapIconCirclePlus extends CirclePlusIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-plus': TapIconCirclePlus;
  }
}
