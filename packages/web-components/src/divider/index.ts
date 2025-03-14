import { customElement } from "lit/decorators.js";
import styles from "./divider.style.ts";
import { Divider } from "./divider.ts";

/**
 * @summary A divider component used to separate content.
 *
 * @tag tapsi-divider
 *
 * @prop {'thin' | 'medium' | 'thick'} [variant='thin'] - The thickness of the divider.
 */
@customElement("tapsi-divider")
export class TapsiDivider extends Divider {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-divider": TapsiDivider;
  }
}
