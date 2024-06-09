import { customElement } from 'lit/decorators.js';
import { MoreHorizontalIcon } from './more-horizontal';

@customElement('tap-icon-more-horizontal')
export class TapIconMoreHorizontal extends MoreHorizontalIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-more-horizontal': TapIconMoreHorizontal;
  }
}
