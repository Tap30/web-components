import { customElement } from 'lit/decorators.js';
import { PencilLineFillIcon } from './pencil-line-fill';

@customElement('tap-icon-pencil-line-fill')
export class TapIconPencilLineFill extends PencilLineFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pencil-line-fill': TapIconPencilLineFill;
  }
}
