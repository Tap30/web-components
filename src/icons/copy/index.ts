import { customElement } from 'lit/decorators.js';
import { CopyIcon } from './copy';

@customElement('tap-icon-copy')
export class TapIconCopy extends CopyIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-copy': TapIconCopy;
  }
}
