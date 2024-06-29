import { customElement } from 'lit/decorators.js';
import { UfoIcon } from './ufo';

@customElement('tap-icon-ufo')
export class TapIconUfo extends UfoIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-ufo': TapIconUfo;
  }
}
