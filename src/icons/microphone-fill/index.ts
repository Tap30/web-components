import { customElement } from 'lit/decorators.js';
import { MicrophoneFillIcon } from './microphone-fill';

@customElement('tap-icon-microphone-fill')
export class TapIconMicrophoneFill extends MicrophoneFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-microphone-fill': TapIconMicrophoneFill;
  }
}
