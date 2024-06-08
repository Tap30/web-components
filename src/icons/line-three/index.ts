import { customElement } from 'lit/decorators.js';
import { LineThreeIcon } from './line-three';

@customElement('tap-icon-line-three')
export class TapIconLineThree extends LineThreeIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-line-three': TapIconLineThree;
  }
}
