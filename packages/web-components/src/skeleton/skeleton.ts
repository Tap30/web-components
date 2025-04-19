import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap, type StyleInfo } from "lit/directives/style-map.js";
import { logger } from "../utils/index.ts";
import { ErrorMessages } from "./constants.ts";
import styles from "./skeleton.style.ts";

/**
 * @summary Provide a placeholder while you wait for content to load, or to visualize content that doesn't exist yet.
 *
 * @tag tapsi-skeleton
 *
 * @slot - The default slot for the skeleton.
 */
export class Skeleton extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /**
   * The type of content that will be rendered.
   *
   * @prop {"rectangular" | "circular" | "pill" | "text"} variant
   * @attr {"rectangular" | "circular" | "pill" | "text"} variant
   * @default "rectangular"
   */
  @property()
  public variant: "rectangular" | "circular" | "pill" | "text" = "rectangular";

  /**
   * Width of the skeleton.
   *
   * @prop {string} width
   * @attr {string} width
   * @default ""
   */
  @property()
  public width = "";

  /**
   * Height of the skeleton.
   *
   * @prop {string} height
   * @attr {string} height
   * @default ""
   */
  @property()
  public height = "";

  /**
   * The ratio of the width to the height.
   * If the value is invalid, it will default to 1.
   *
   * Only works when `variant="rectangular"`.
   *
   * @prop {string} ratio
   * @attr {string} ratio
   * @default NaN
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
        ErrorMessages.SET_RATIO_ONLY_IN_RECTANGULAR_VARIANT,
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
