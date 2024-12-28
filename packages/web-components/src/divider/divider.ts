import { LitElement } from "lit";
import { property } from "lit/decorators.js";

export class Divider extends LitElement {
  /**
   * The thickness of the divider.
   */
  @property({ type: String, reflect: true })
  public variant: "thin" | "medium" | "thick" = "thin";

  public override connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "separator");
  }
}
