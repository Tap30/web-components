import { customElement } from 'lit/decorators.js';
import { MicrophoneSlashIcon } from './microphone-slash';

@customElement('tap-icon-microphone-slash')
export class TapIconMicrophoneSlash extends MicrophoneSlashIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-microphone-slash': TapIconMicrophoneSlash;
  }
}
