import { customElement } from 'lit/decorators.js';
import { MicrophoneSlashFillIcon } from './microphone-slash-fill';

@customElement('tap-icon-microphone-slash-fill')
export class TapIconMicrophoneSlashFill extends MicrophoneSlashFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-microphone-slash-fill': TapIconMicrophoneSlashFill;
  }
}
