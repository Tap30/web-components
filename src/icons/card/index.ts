import { customElement } from 'lit/decorators.js';
import { CardIcon } from './card';

@customElement('tap-icon-card')
export class TapIconCard extends CardIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card': TapIconCard;
  }
}
