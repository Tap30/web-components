import { LitElement, type PropertyValues, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./avatar.style.ts";

/**
 * @summary Display user profile image, initials or fallback icon
 *
 * @tag tapsi-avatar
 *
 * @slot - The default slot to use when image is not present.
 */
export class Avatar extends LitElement {
  public static override readonly styles = [styles];

  @state()
  private _hasError = false;

  /**
   * The image source to use for the avatar.
   *
   * @prop {string} image
   * @attr {string} image
   * @default ""
   */
  @property()
  public image = "";

  /**
   * A label to use to describe the avatar to assistive devices.
   *
   * @prop {string} label
   * @attr {string} label
   * @default ""
   */
  @property()
  public label = "";

  /**
   * The alternative text description of the avatar image, used for accessibility.
   *
   * @prop {string} alt
   * @attr {string} alt
   * @default ""
   */
  @property()
  public alt = "";

  /**
   * Indicates how the browser should load the image.
   *
   * @prop {"eager" | "lazy"} loading
   * @attr {"eager" | "lazy"} loading
   * @default "eager"
   */
  @property()
  public loading: "eager" | "lazy" = "eager";

  /**
   * The size of the avatar.
   *
   * @prop {'xs' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg'} size
   * @attr {'xs' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg'} size
   * @default "md"
   */
  @property()
  public size: "xs" | "sm" | "md" | "lg" | "xlg" | "xxlg" = "md";

  protected override updated(changed: PropertyValues<this>) {
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
