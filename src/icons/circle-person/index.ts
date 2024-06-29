import { customElement } from 'lit/decorators.js';
import { CirclePersonIcon } from './circle-person';

@customElement('tap-icon-circle-person')
export class TapIconCirclePerson extends CirclePersonIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-person': TapIconCirclePerson;
  }
}
