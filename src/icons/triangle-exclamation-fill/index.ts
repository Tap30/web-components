import { customElement } from 'lit/decorators.js';
import { TriangleExclamationFillIcon } from './triangle-exclamation-fill';

@customElement('tap-icon-triangle-exclamation-fill')
export class TapIconTriangleExclamationFill extends TriangleExclamationFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-triangle-exclamation-fill': TapIconTriangleExclamationFill;
  }
}
