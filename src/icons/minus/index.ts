import { customElement } from 'lit/decorators.js';
import { MinusIcon } from './minus';

@customElement('tap-icon-minus')
export class TapIconMinus extends MinusIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-minus': TapIconMinus;
  }
}
