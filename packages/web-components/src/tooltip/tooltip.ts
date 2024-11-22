import {
  arrow,
  computePosition,
  type MiddlewareData,
  offset,
  type Side,
} from "@floating-ui/dom";
import "@tapsioss/icons/dist/icons/cross";
import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property, query, queryAssignedElements } from "lit/decorators.js";
import "../button/iconed";

export class Tooltip extends LitElement {
  @property({ type: String, reflect: true })
  public placement:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end" = "top";

  @property({ type: Boolean, reflect: true })
  public dismissible = true;

  @property({ type: String, reflect: true })
  public width: string = "0";

  @property({ type: String, reflect: true, attribute: "arrow-offset" })
  public arrowOffset: string = "";

  @query("#tooltip")
  private _tooltipElement?: HTMLElement | null;

  @query("#arrow")
  private _arrowElement?: HTMLElement | null;

  @queryAssignedElements({ slot: "target-element" })
  private _targetElement?: Array<HTMLElement> | [];

  override connectedCallback() {
    super.connectedCallback();

    window.requestAnimationFrame(() => {
      if (
        this._tooltipElement &&
        this._arrowElement &&
        this._targetElement?.[0]
      ) {
        computePosition(this._targetElement[0], this._tooltipElement, {
          placement: this.placement,
          middleware: [arrow({ element: this._arrowElement }), offset(8)],
        })
          .then(({ x, y, middlewareData }) => {
            if (this._tooltipElement) {
              this._tooltipElement.style.left = `${x}px`;
              this._tooltipElement.style.top = `${y}px`;
            }

            if (this._arrowElement) {
              this._calculateArrowPosition(middlewareData, this._arrowElement);
            }
          })
          // eslint-disable-next-line no-console
          .catch(error => console.error(error));
      }
    });

    if (this.hasAttribute("dismissible")) {
      this.dismissible = this.getAttribute("dismissible") !== "false";
    }
  }

  protected override updated(changed: PropertyValues): void {
    if (changed.has("width")) {
      this.style.setProperty("--tap-tooltip-width", this.width);
    }
  }

  private _calculateArrowPosition(
    middlewareData: MiddlewareData,
    arrowEl: HTMLElement,
  ) {
    const side = (this.placement.split("-") as Side[])[0];

    const sidesMap: Record<Side, Side> = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    };

    const staticSide = typeof side === "undefined" ? "top" : sidesMap[side];

    if (middlewareData.arrow) {
      const { x, y } = middlewareData.arrow;

      Object.assign(arrowEl.style, {
        left: x != null ? `${x}px` : "",
        top: y != null ? `${y}px` : "",
        [staticSide]: `${-arrowEl.offsetWidth / 2}px`,
      });
    }

    if (this.arrowOffset) {
      if (side === "top" || side === "bottom") {
        arrowEl.style.left = `${this.arrowOffset}`;
      } else if (side === "left" || side === "right") {
        arrowEl.style.top = `${this.arrowOffset}`;
      }
    }
  }

  private _handleDismiss() {
    const tooltipElement = this.renderRoot.querySelector(
      "#tooltip",
    ) as HTMLElement;

    tooltipElement.remove();
  }

  private _renderDismissButton() {
    return this.dismissible
      ? html`
          <tap-icon-button
            @click=${() => this._handleDismiss()}
            type="button"
            size="small"
            variant="naked"
            }
          >
            <tap-icon-cross color="#fff"></tap-icon-cross>
          </tap-icon-button>
        `
      : nothing;
  }

  private _renderArrow() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="10"
        viewBox="0 0 5 10"
        fill="none"
      >
        <path
          d="M5.0001 0V10L0.707205 5.70711C0.316681 5.31658 0.316682 4.68342 0.707206 4.29289L5.0001 0Z"
          fill="#323333"
        />
      </svg>
    `;
  }

  protected override render() {
    return html`
      <div
        id="tooltip"
        class="tooltip"
      >
        ${this._renderDismissButton()}
        <div
          id="arrow"
          class="tooltip-icon"
        >
          ${this._renderArrow()}
        </div>
        <div class="tooltip-label">
          <slot name="label"></slot>
        </div>
      </div>
      <slot name="target-element"></slot>
    `;
  }
}
