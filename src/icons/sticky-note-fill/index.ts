import { customElement } from 'lit/decorators.js';
import { StickyNoteFillIcon } from './sticky-note-fill';

@customElement('tap-icon-sticky-note-fill')
export class TapIconStickyNoteFill extends StickyNoteFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-sticky-note-fill': TapIconStickyNoteFill;
  }
}
