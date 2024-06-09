import { customElement } from 'lit/decorators.js';
import { RectanglePersonTextWithBadgeIcon } from './rectangle-person-text-with-badge';

@customElement('tap-icon-rectangle-person-text-with-badge')
export class TapIconRectanglePersonTextWithBadge extends RectanglePersonTextWithBadgeIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-rectangle-person-text-with-badge': TapIconRectanglePersonTextWithBadge;
  }
}
