import { customElement } from 'lit/decorators.js';
import { MedalFillIcon } from './medal-fill';

@customElement('tap-icon-medal-fill')
export class TapIconMedalFill extends MedalFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-medal-fill': TapIconMedalFill;
  }
}
