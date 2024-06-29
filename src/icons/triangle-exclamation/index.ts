import { customElement } from 'lit/decorators.js';
import { TriangleExclamationIcon } from './triangle-exclamation';

@customElement('tap-icon-triangle-exclamation')
export class TapIconTriangleExclamation extends TriangleExclamationIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-triangle-exclamation': TapIconTriangleExclamation;
  }
}
