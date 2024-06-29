import { customElement } from 'lit/decorators.js';
import { BookmarkFillIcon } from './bookmark-fill';

@customElement('tap-icon-bookmark-fill')
export class TapIconBookmarkFill extends BookmarkFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-bookmark-fill': TapIconBookmarkFill;
  }
}
