import { customElement } from 'lit/decorators.js';
import { MagnifierIcon } from './magnifier';

@customElement('tap-icon-magnifier')
export class TapIconMagnifier extends MagnifierIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-magnifier': TapIconMagnifier;
  }
}
