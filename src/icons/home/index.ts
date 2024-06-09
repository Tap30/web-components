import { customElement } from 'lit/decorators.js';
import { HomeIcon } from './home';

@customElement('tap-icon-home')
export class TapIconHome extends HomeIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-home': TapIconHome;
  }
}
