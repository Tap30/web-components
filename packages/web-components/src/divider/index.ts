import { customElement } from "lit/decorators.js";
import { Divider } from "./divider.js";
import styles from "./divider.style.js";

/**
 * @summary A divider component used to separate content.
 *
 * @tag tap-divider
 *
 * @prop {'thin' | 'medium' | 'thick'} [variant='thin'] - The thickness of the divider.
 */
@customElement("tap-divider")
export class TapDivider extends Divider {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-divider": TapDivider;
  }
}
