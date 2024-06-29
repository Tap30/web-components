import { customElement } from 'lit/decorators.js';
import { VideoTwoFillIcon } from './video-two-fill';

@customElement('tap-icon-video-two-fill')
export class TapIconVideoTwoFill extends VideoTwoFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-video-two-fill': TapIconVideoTwoFill;
  }
}
