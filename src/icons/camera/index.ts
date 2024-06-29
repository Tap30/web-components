import { customElement } from 'lit/decorators.js';
import { CameraIcon } from './camera';

@customElement('tap-icon-camera')
export class TapIconCamera extends CameraIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-camera': TapIconCamera;
  }
}
