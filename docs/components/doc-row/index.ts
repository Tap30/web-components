import { customElement } from 'lit/decorators.js';
import styles from './doc-row.style';
import {Row} from "./doc-row";

@customElement('doc-row')
export class DocRow extends Row {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'doc-row': DocRow;
  }
}
