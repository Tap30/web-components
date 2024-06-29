import { customElement } from 'lit/decorators.js';
import { ListBulletIcon } from './list-bullet';

@customElement('tap-icon-list-bullet')
export class TapIconListBullet extends ListBulletIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-list-bullet': TapIconListBullet;
  }
}
