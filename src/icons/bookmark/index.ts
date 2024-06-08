import { customElement } from 'lit/decorators.js';
import { BookmarkIcon } from './bookmark';

@customElement('tap-icon-bookmark')
export class TapIconBookmark extends BookmarkIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-bookmark': TapIconBookmark;
  }
}
