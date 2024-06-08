import { customElement } from 'lit/decorators.js';
import { TrashFillIcon } from './trash-fill';

@customElement('tap-icon-trash-fill')
export class TapIconTrashFill extends TrashFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-trash-fill': TapIconTrashFill;
  }
}
