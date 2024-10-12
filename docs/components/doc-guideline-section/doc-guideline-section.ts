import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class GuidelineSection extends LitElement {
  @property({ type: Boolean })
  public reverse = false;

  protected override render() {
    return html`
      <div
        part="guideline-section"
        class="guideline-section ${this.reverse ? "reverse" : ""}"
      >
        <div class="content">
          <slot></slot>
        </div>
        <div class="image">
          <slot name="image"></slot>
        </div>
      </div>
    `;
  }
}
