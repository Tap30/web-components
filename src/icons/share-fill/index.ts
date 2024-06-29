import { customElement } from 'lit/decorators.js';
import { ShareFillIcon } from './share-fill';

@customElement('tap-icon-share-fill')
export class TapIconShareFill extends ShareFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-share-fill': TapIconShareFill;
  }
}
