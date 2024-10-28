import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

export class EmptyState extends LitElement {
  @property({ type: String })
  public override title = "";

  @property({ type: String })
  public description = "";

  protected override render() {
    return html`
      <div
        class="container"
        part="container"
      >
        <span
          class="icon"
          part="icon"
        >
          <slot name="icon"></slot>
        </span>
        <div
          class="content"
          part="content"
        >
          ${this.title
            ? html`<span
                part="title"
                class="title"
                >${this.title}</span
              >`
            : nothing}
          ${this.description
            ? html`<p
                part="description"
                class="description"
              >
                ${this.description}
              </p>`
            : nothing}
        </div>
        <div
          class="actions"
          part="actions"
        >
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}
