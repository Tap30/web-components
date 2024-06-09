import { customElement } from 'lit/decorators.js';
import { CopyFillIcon } from './copy-fill';

@customElement('tap-icon-copy-fill')
export class TapIconCopyFill extends CopyFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-copy-fill': TapIconCopyFill;
  }
}
