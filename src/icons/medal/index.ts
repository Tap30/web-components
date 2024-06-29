import { customElement } from 'lit/decorators.js';
import { MedalIcon } from './medal';

@customElement('tap-icon-medal')
export class TapIconMedal extends MedalIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-medal': TapIconMedal;
  }
}
