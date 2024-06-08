import { customElement } from 'lit/decorators.js';
import { PlayIcon } from './play';

@customElement('tap-icon-play')
export class TapIconPlay extends PlayIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-play': TapIconPlay;
  }
}
