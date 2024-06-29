import { customElement } from 'lit/decorators.js';
import { PauseIcon } from './pause';

@customElement('tap-icon-pause')
export class TapIconPause extends PauseIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pause': TapIconPause;
  }
}
