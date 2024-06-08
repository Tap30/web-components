import { customElement } from 'lit/decorators.js';
import { CameraFillIcon } from './camera-fill';

@customElement('tap-icon-camera-fill')
export class TapIconCameraFill extends CameraFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-camera-fill': TapIconCameraFill;
  }
}
