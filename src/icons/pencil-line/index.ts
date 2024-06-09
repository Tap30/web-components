import { customElement } from 'lit/decorators.js';
import { PencilLineIcon } from './pencil-line';

@customElement('tap-icon-pencil-line')
export class TapIconPencilLine extends PencilLineIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pencil-line': TapIconPencilLine;
  }
}
