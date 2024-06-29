import { customElement } from 'lit/decorators.js';
import { KeyboardIcon } from './keyboard';

@customElement('tap-icon-keyboard')
export class TapIconKeyboard extends KeyboardIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-keyboard': TapIconKeyboard;
  }
}
