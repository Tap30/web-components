import { customElement } from 'lit/decorators.js';
import { TrashIcon } from './trash';

@customElement('tap-icon-trash')
export class TapIconTrash extends TrashIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-trash': TapIconTrash;
  }
}
