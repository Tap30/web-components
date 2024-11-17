import { LitElement, type PropertyValues, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

export class Avatar extends LitElement {
  @state()
  private _hasError = false;

  /**
   * The image source to use for the avatar.
   */
  @property()
  public image = "";

  /**
   * A label to use to describe the avatar to assistive devices.
   */
  @property()
  public label = "";

  /**
   * The alternative text description of the avatar image, used for accessibility.
   */
  @property()
  public alt = "";

  /**
   * Indicates how the browser should load the image.
   */
  @property()
  public loading: "eager" | "lazy" = "eager";

  /**
   * The size of the avatar.
   */
  @property()
  public size: "xs" | "sm" | "md" | "lg" | "xlg" | "xxlg" = "md";

  protected override updated(changed: PropertyValues) {
    if (changed.has("image")) {
      this._hasError = false;
    }
  }

  private _renderImage() {
    return html`
      <img
        part="image"
        class="image"
        alt=${this.alt}
        src="${this.image}"
        loading="${this.loading}"
        @error="${() => (this._hasError = true)}"
      />
    `;
  }

  private _renderPlaceholder() {
    return html` <div
      part="placeholder"
      class="placeholder"
      aria-hidden="true"
    >
      <slot></slot>
    </div>`;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.size]: true,
    });

    return html`
      <div
        role="img"
        aria-label=${this.label}
        part="root"
        class=${rootClasses}
      >
        ${this.image && !this._hasError
          ? this._renderImage()
          : this._renderPlaceholder()}
      </div>
    `;
  }
}
