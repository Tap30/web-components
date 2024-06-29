import { customElement } from 'lit/decorators.js';
import { RecordIcon } from './record';

@customElement('tap-icon-record')
export class TapIconRecord extends RecordIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-record': TapIconRecord;
  }
}
