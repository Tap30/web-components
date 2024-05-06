import { html, LitElement, PropertyValues, nothing } from "lit";
import { property } from "lit/decorators.js"
import { computePosition, arrow, offset, MiddlewareData } from "@floating-ui/dom";
import "../icons/index.js";
import "../button/index";

export class Tooltip extends LitElement {
  @property({ type: String, reflect: true }) placement:
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end' = 'top';
  @property({ type: Boolean, reflect: true }) dismissible: boolean = true;
  @property({ type: String, reflect: true }) width: string = "0";
  @property({ type: String, reflect: true }) arrowOffset: string = "";

  connectedCallback() {
    super.connectedCallback();
    window.requestAnimationFrame(() => {
      const tooltipElement = this.renderRoot.querySelector("#tooltip") as HTMLElement;
      const arrowElement = this.renderRoot.querySelector("#arrow")as HTMLElement;
      const referenceElement = tooltipElement.offsetParent;

      if (referenceElement && tooltipElement && arrowElement) {
        computePosition(referenceElement, tooltipElement, {
          placement: this.placement,
          middleware: [arrow({ element: arrowElement }), offset(8)]
        }).then(({ x, y, middlewareData }) => {
          tooltipElement.style.left = `${x}px`;
          tooltipElement.style.top = `${y}px`;
          
          this.calculateArrowPosition(middlewareData, arrowElement);
        });
      }
    })
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("width")) {
      this.style.setProperty("--tap-tooltip-width", this.width);
    }
  }

  private calculateArrowPosition(middlewareData: MiddlewareData, arrowEl: HTMLElement) {
    const side = this.placement.split("-")[0];
      const staticSide: string = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[side] || "top";

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

  private renderDismissIcon() {
    return this.dismissible ? html`
      <tap-button size="small" variant="naked" shape="circle" .icon=${html`<tap-icon-cross color="#fff"></tap-icon-cross>`}></tap-button>
    ` : nothing;
  }

  private renderArrowIcon() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
        <path d="M5.0001 0V10L0.707205 5.70711C0.316681 5.31658 0.316682 4.68342 0.707206 4.29289L5.0001 0Z" fill="#323333"/>
      </svg>
    `
  }

  render() {
    return html`
      <div id="tooltip" class="tooltip">
        ${this.renderDismissIcon()}
        <div id="arrow" class="tooltip-icon">
          ${this.renderArrowIcon()}
        </div>
        <div class="tooltip-label">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
