import { customElement } from 'lit/decorators.js';
import { MotorcycleIcon } from './motorcycle';

@customElement('tap-icon-motorcycle')
export class TapIconMotorcycle extends MotorcycleIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-motorcycle': TapIconMotorcycle;
  }
}
