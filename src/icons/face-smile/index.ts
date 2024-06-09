import { customElement } from 'lit/decorators.js';
import { FaceSmileIcon } from './face-smile';

@customElement('tap-icon-face-smile')
export class TapIconFaceSmile extends FaceSmileIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-face-smile': TapIconFaceSmile;
  }
}
