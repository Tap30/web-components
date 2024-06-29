import { customElement } from 'lit/decorators.js';
import { MicrophoneSparkFillIcon } from './microphone-spark-fill';

@customElement('tap-icon-microphone-spark-fill')
export class TapIconMicrophoneSparkFill extends MicrophoneSparkFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-microphone-spark-fill': TapIconMicrophoneSparkFill;
  }
}
