import { customElement } from 'lit/decorators.js';
import { MicrophoneSparkIcon } from './microphone-spark';

@customElement('tap-icon-microphone-spark')
export class TapIconMicrophoneSpark extends MicrophoneSparkIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-microphone-spark': TapIconMicrophoneSpark;
  }
}
