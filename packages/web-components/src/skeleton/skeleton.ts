import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap, type StyleInfo } from "lit/directives/style-map.js";
import { logger } from "../utils/index.ts";

export class Skeleton extends LitElement {
  /**
   * The type of content that will be rendered.
   */
  @property()
  public variant: "rectangular" | "circular" | "pill" | "text" = "rectangular";

  /**
   * Width of the skeleton.
   */
  @property()
  public width = "";

  /**
   * Height of the skeleton.
   */
  @property()
  public height = "";

  /**
   * The ratio of the width to the height.
   * If the value is invalid, it will default to 1.
   *
   * Only works when `variant="rectangular"`.
   */
  @property({ type: Number })
  public ratio = NaN;

  protected override render() {
    const styleInfo: StyleInfo = {};

    if (this.width) styleInfo.width = this.width;
    if (this.height) styleInfo.height = this.height;

    if (this.ratio && this.variant === "rectangular") {
      const ratio = Number.isNaN(Number(this.ratio)) ? 1 : Number(this.ratio);

      styleInfo.height = 0;
      styleInfo.paddingTop = `${100 / ratio}%`;
    } else if (this.ratio && this.variant !== "rectangular") {
      logger(
        'You can only use `ratio` when `variant="rectangular"`.',
        "skeleton",
        "error",
      );
    }

    if (this.variant === "text") {
      styleInfo.width = "fit-content";
      styleInfo.height = "auto";
    }

    const rootStyles = styleMap(styleInfo);

    const rootClasses = classMap({
      root: true,
      [this.variant]: true,
    });

    return html`
      <div
        id="root"
        class=${rootClasses}
        style=${rootStyles}
        part="root"
      >
        <slot></slot>
      </div>
    `;
  }
}
