import { LitElement, type CSSResultGroup } from "lit";
import { property } from "lit/decorators.js";
import styles from "./divider.style.ts";

/**
 * @summary A divider component used to separate content.
 *
 * @tag tapsi-divider
 */
export class Divider extends LitElement {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

  /**
   * The thickness of the divider.
   *
   * @prop {"thin" | "medium" | "thick"} variant
   * @attr {"thin" | "medium" | "thick"} variant
   * @default "thin"
   */
  @property({ reflect: true })
  public variant: "thin" | "medium" | "thick" = "thin";

  /** @internal */
  public override connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute("role", "separator");
  }
}
