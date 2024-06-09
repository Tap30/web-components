import { customElement } from 'lit/decorators.js';
import { CallLeftIcon } from './call-left';

@customElement('tap-icon-call-left')
export class TapIconCallLeft extends CallLeftIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-call-left': TapIconCallLeft;
  }
}
