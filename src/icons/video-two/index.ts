import { customElement } from 'lit/decorators.js';
import { VideoTwoIcon } from './video-two';

@customElement('tap-icon-video-two')
export class TapIconVideoTwo extends VideoTwoIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-video-two': TapIconVideoTwo;
  }
}
