import { customElement } from 'lit/decorators.js';
import { ImageIcon } from './image';

@customElement('tap-icon-image')
export class TapIconImage extends ImageIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-image': TapIconImage;
  }
}
