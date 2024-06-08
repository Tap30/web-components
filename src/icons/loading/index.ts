import { customElement } from 'lit/decorators.js';
import { LoadingIcon } from './loading';

@customElement('tap-icon-loading')
export class TapIconLoading extends LoadingIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-loading': TapIconLoading;
  }
}
