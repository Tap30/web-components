import { customElement } from 'lit/decorators.js';
import { MoreVerticalFillIcon } from './more-vertical-fill';

@customElement('tap-icon-more-vertical-fill')
export class TapIconMoreVerticalFill extends MoreVerticalFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-more-vertical-fill': TapIconMoreVerticalFill;
  }
}
