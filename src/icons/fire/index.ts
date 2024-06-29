import { customElement } from 'lit/decorators.js';
import { FireIcon } from './fire';

@customElement('tap-icon-fire')
export class TapIconFire extends FireIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-fire': TapIconFire;
  }
}
