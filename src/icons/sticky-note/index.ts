import { customElement } from 'lit/decorators.js';
import { StickyNoteIcon } from './sticky-note';

@customElement('tap-icon-sticky-note')
export class TapIconStickyNote extends StickyNoteIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-sticky-note': TapIconStickyNote;
  }
}
