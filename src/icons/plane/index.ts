import { customElement } from 'lit/decorators.js';
import { PlaneIcon } from './plane';

@customElement('tap-icon-plane')
export class TapIconPlane extends PlaneIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-plane': TapIconPlane;
  }
}
