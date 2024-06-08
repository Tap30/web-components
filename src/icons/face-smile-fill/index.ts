import { customElement } from 'lit/decorators.js';
import { FaceSmileFillIcon } from './face-smile-fill';

@customElement('tap-icon-face-smile-fill')
export class TapIconFaceSmileFill extends FaceSmileFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-face-smile-fill': TapIconFaceSmileFill;
  }
}
