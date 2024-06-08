import { customElement } from 'lit/decorators.js';
import { MicrophoneIcon } from './microphone';

@customElement('tap-icon-microphone')
export class TapIconMicrophone extends MicrophoneIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-microphone': TapIconMicrophone;
  }
}
