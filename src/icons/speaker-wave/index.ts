import { customElement } from 'lit/decorators.js';
import { SpeakerWaveIcon } from './speaker-wave';

@customElement('tap-icon-speaker-wave')
export class TapIconSpeakerWave extends SpeakerWaveIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-speaker-wave': TapIconSpeakerWave;
  }
}
