import { customElement } from 'lit/decorators.js';
import { CarSlashFillIcon } from './car-slash-fill';

@customElement('tap-icon-car-slash-fill')
export class TapIconCarSlashFill extends CarSlashFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-car-slash-fill': TapIconCarSlashFill;
  }
}
