import { customElement } from 'lit/decorators.js';
import { RectanglePersonTextIcon } from './rectangle-person-text';

@customElement('tap-icon-rectangle-person-text')
export class TapIconRectanglePersonText extends RectanglePersonTextIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-rectangle-person-text': TapIconRectanglePersonText;
  }
}
