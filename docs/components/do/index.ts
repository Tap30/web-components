import { customElement } from 'lit/decorators.js';
import { Do } from './do';
import styles from './do.style';

@customElement('doc-do')
export class DocDo extends Do {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'doc-do': DocDo;
  }
}
