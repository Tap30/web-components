import { customElement } from "lit/decorators.js";
import { Row } from "./doc-row";
import styles from "./doc-row.style";

@customElement("doc-row")
export class DocRow extends Row {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "doc-row": DocRow;
  }
}
