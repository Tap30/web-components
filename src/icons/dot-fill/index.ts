import { customElement } from 'lit/decorators.js';
import { DotFillIcon } from './dot-fill';

@customElement('tap-icon-dot-fill')
export class TapIconDotFill extends DotFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-dot-fill': TapIconDotFill;
  }
}
