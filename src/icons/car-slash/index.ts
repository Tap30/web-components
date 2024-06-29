import { customElement } from 'lit/decorators.js';
import { CarSlashIcon } from './car-slash';

@customElement('tap-icon-car-slash')
export class TapIconCarSlash extends CarSlashIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-car-slash': TapIconCarSlash;
  }
}
