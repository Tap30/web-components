import { customElement } from 'lit/decorators.js';
import { SpeakerExclamationIcon } from './speaker-exclamation';

@customElement('tap-icon-speaker-exclamation')
export class TapIconSpeakerExclamation extends SpeakerExclamationIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-speaker-exclamation': TapIconSpeakerExclamation;
  }
}
