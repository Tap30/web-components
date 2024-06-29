import { customElement } from 'lit/decorators.js';
import { MedalFill1Icon } from './medal-fill-1';

@customElement('tap-icon-medal-fill-1')
export class TapIconMedalFill1 extends MedalFill1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-medal-fill-1': TapIconMedalFill1;
  }
}
