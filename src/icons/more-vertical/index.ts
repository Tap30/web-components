import { customElement } from 'lit/decorators.js';
import { MoreVerticalIcon } from './more-vertical';

@customElement('tap-icon-more-vertical')
export class TapIconMoreVertical extends MoreVerticalIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-more-vertical': TapIconMoreVertical;
  }
}
