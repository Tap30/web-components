import { customElement } from 'lit/decorators.js';
import { SpeakerCrossIcon } from './speaker-cross';

@customElement('tap-icon-speaker-cross')
export class TapIconSpeakerCross extends SpeakerCrossIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-speaker-cross': TapIconSpeakerCross;
  }
}
