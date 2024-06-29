import { customElement } from 'lit/decorators.js';
import { CameraPlusIcon } from './camera-plus';

@customElement('tap-icon-camera-plus')
export class TapIconCameraPlus extends CameraPlusIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-camera-plus': TapIconCameraPlus;
  }
}
