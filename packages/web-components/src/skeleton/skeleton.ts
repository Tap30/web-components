import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { type SkeletonAnimation, type SkeletonVariant } from "./types";

export class Skeleton extends LitElement {
  @property({ reflect: true })
  public variant?: SkeletonVariant = "line";

  @property({ reflect: true, attribute: "animation-mode" })
  public animationMode?: SkeletonAnimation = "progress";

  @property({ reflect: true })
  public width?: string = "100%";

  @property({ reflect: true })
  public height?: string = "20px";

  protected override render() {
    return html`<div
      part="skeleton"
      class="skeleton"
      aria-label="Loading"
      aria-labeledby=${nothing}
      aria-describedby=${nothing}
      style="height: ${this.height}; width: ${this.width};"
    ></div>`;
  }
}
