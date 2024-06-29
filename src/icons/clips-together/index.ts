import { customElement } from 'lit/decorators.js';
import { ClipsTogetherIcon } from './clips-together';

@customElement('tap-icon-clips-together')
export class TapIconClipsTogether extends ClipsTogetherIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-clips-together': TapIconClipsTogether;
  }
}
