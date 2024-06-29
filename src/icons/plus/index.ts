import { customElement } from 'lit/decorators.js';
import { PlusIcon } from './plus';

@customElement('tap-icon-plus')
export class TapIconPlus extends PlusIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-plus': TapIconPlus;
  }
}
