import { customElement } from 'lit/decorators.js';
import { ShareIcon } from './share';

@customElement('tap-icon-share')
export class TapIconShare extends ShareIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-share': TapIconShare;
  }
}
