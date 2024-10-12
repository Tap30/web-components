import { LitElement, type PropertyValues, html } from "lit";
import { property, state } from "lit/decorators.js";

export class Avatar extends LitElement {
  @state()
  private _hasError = false;

  @property()
  public image = "";

  @property()
  public label = "";

  @property()
  public loading: "eager" | "lazy" = "eager";

  @property()
  public size: "xSmall" | "small" | "medium" | "large" | "xLarge" = "medium";

  protected override updated(changed: PropertyValues) {
    if (changed.has("image")) {
      this._hasError = false;
    }
  }

  private _renderImage() {
    return html`
      <img
        alt=""
        part="image"
        src="${this.image}"
        loading="${this.loading}"
        @error="${() => (this._hasError = true)}"
      />
    `;
  }

  private _renderPlaceholder() {
    return html` <div
      part="placeholder"
      aria-hidden="true"
      class="placeholder"
    >
      <slot></slot>
    </div>`;
  }

  protected override render() {
    return html`
      <div
        role="img"
        aria-label=${this.label}
        part="avatar"
        class="avatar"
      >
        ${this.image && !this._hasError
          ? this._renderImage()
          : this._renderPlaceholder()}
      </div>
    `;
  }
}
