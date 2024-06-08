import { customElement } from 'lit/decorators.js';
import { ClipboardClockIcon } from './clipboard-clock';

@customElement('tap-icon-clipboard-clock')
export class TapIconClipboardClock extends ClipboardClockIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-clipboard-clock': TapIconClipboardClock;
  }
}
