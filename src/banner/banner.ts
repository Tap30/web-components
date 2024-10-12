import { LitElement, type PropertyValues, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

export class Banner extends LitElement {
  @property()
  public heading?: string;

  @property()
  public description?: string;

  @property()
  public image?: string;

  @property({ type: Boolean, attribute: "full-width" })
  public fullWidth = false;

  @property()
  public variant: "default" | "hero" = "default";

  @property({ attribute: "background-color" })
  public backgroundColor?: string;

  @property({ attribute: "text-color" })
  public textColor?: string;

  protected override updated(changed: PropertyValues): void {
    if (changed.has("backgroundColor") && !!this.backgroundColor) {
      this.style.setProperty(
        "--tap-banner-color-surface",
        this.backgroundColor,
      );
    }

    if (changed.has("textColor") && !!this.textColor) {
      this.style.setProperty("--tap-banner-color-content", this.textColor);
    }

    if (changed.has("image") && !!this.image) {
      this.style.setProperty(
        "--tap-banner-background-image",
        `url(${this.image})`,
      );
    }
  }

  protected override render() {
    return html`
      <div
        role="banner"
        class=${classMap({
          banner: true,
          hero: this.variant === "hero",
        })}
      >
        ${this.variant === "hero"
          ? html`
              <div class="extra">
                <slot name="extra"></slot>
              </div>
            `
          : nothing}
        <div class="content">
          ${this.heading ? html`<h4>${this.heading}</h4>` : nothing}
          ${this.description ? html`<p>${this.description}</p>` : nothing}
          <div class="action">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
