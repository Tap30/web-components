import { customElement } from 'lit/decorators.js';
import { MoreHorizontalFillIcon } from './more-horizontal-fill';

@customElement('tap-icon-more-horizontal-fill')
export class TapIconMoreHorizontalFill extends MoreHorizontalFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-more-horizontal-fill': TapIconMoreHorizontalFill;
  }
}
