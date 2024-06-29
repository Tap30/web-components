import { customElement } from 'lit/decorators.js';
import { KeyboardFillIcon } from './keyboard-fill';

@customElement('tap-icon-keyboard-fill')
export class TapIconKeyboardFill extends KeyboardFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-keyboard-fill': TapIconKeyboardFill;
  }
}
