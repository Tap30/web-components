import { customElement } from 'lit/decorators.js';
import { Dont } from './dont';
import styles from './dont.style';

@customElement('doc-dont')
export class DocDont extends Dont {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'doc-dont': DocDont;
  }
}
