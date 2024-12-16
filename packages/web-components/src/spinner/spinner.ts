import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { SystemError } from "../utils";

export class Spinner extends LitElement {
  /**
   * Determines the size of the spinner.
   * When set to 'auto', it inherits the size of its parent element.
   * Otherwise, you can specify the size in pixels.
   */
  @property()
  public size: number | `${number}` | "auto" = "auto";

  private _getSizeStyles(size: typeof this.size) {
    const hasValidSize =
      (typeof size === "string" &&
        (size === "auto" || !Number.isNaN(Number(size)))) ||
      (typeof size === "number" && !Number.isNaN(size));

    if (!hasValidSize) {
      throw new SystemError(
        `Invalid size provided! (provided size: \`size=${
          typeof size === "number" ? `${size}` : `${String(size)}`
        }\`)`,
        "spinner",
      );
    }

    return size === "auto"
      ? {
          width: "100%",
          height: "100%",
        }
      : {
          width: `${Number(size) / 16}rem`,
          height: `${Number(size) / 16}rem`,
          maxWidth: `${Number(size) / 16}rem`,
          maxHeight: `${Number(size) / 16}rem`,
        };
  }

  protected override render() {
    const { width, height, maxWidth, maxHeight } = this._getSizeStyles(
      this.size,
    );

    this.style.width = width;
    this.style.height = height;
    this.style.maxWidth = maxWidth || "";
    this.style.maxHeight = maxHeight || "";

    return html`
      <svg
        part="root"
        class="root"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 600"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="Gradient1"
            gradientTransform="rotate(90)"
          >
            <stop
              offset="0%"
              stop-opacity="1"
              stop-color="currentColor"
            />
            <stop
              offset="100%"
              stop-opacity="0.5"
              stop-color="currentColor"
            />
          </linearGradient>
          <linearGradient
            id="Gradient2"
            gradientTransform="rotate(90)"
          >
            <stop
              offset="0%"
              stop-opacity="0"
              stop-color="currentColor"
            />
            <stop
              offset="90%"
              stop-opacity="0.5"
              stop-color="currentColor"
            />
            <stop
              offset="100%"
              stop-opacity="0.65"
              stop-color="currentColor"
            />
          </linearGradient>
          <pattern
            id="Pattern"
            x="0"
            y="0"
            width="600"
            height="600"
            patternUnits="userSpaceOnUse"
          >
            <g>
              <rect
                shape-rendering="crispEdges"
                x="0"
                y="0"
                width="300"
                height="600"
                fill="url(#Gradient1)"
              />
              <rect
                shape-rendering="crispEdges"
                x="300"
                y="0"
                width="300"
                height="600"
                fill="url(#Gradient2)"
              />
            </g>
          </pattern>
        </defs>
        <path
          class="rotating"
          style="stroke: url(#Pattern);"
          fill="transparent"
          stroke-width="80"
          d="M 364 58 A 250 250 0 1 1 235 58"
        />
      </svg>
    `;
  }
}
