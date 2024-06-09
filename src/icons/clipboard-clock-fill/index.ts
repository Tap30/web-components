import { customElement } from 'lit/decorators.js';
import { ClipboardClockFillIcon } from './clipboard-clock-fill';

@customElement('tap-icon-clipboard-clock-fill')
export class TapIconClipboardClockFill extends ClipboardClockFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-clipboard-clock-fill': TapIconClipboardClockFill;
  }
}
