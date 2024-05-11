import { customElement } from "lit/decorators.js";
import { Row } from "./row";
import styles from "./row.style";

@customElement("tap-row")
export class TapRow extends Row {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-row": TapRow;
  }
}
