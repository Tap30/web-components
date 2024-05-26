import { html, LitElement, PropertyValues, nothing } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import {
  computePosition,
  arrow,
  offset,
  MiddlewareData,
} from '@floating-ui/dom';
import '../icons/index.js';
import '../icon-button';

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
  @property({ type: String, reflect: true }) width: string = '0';
  @property({ type: String, reflect: true, attribute: 'arrow-offset' })
  arrowOffset: string = '';

  @query('#tooltip')
  private tooltipElement?: HTMLElement | null;

  @query('#arrow')
  private arrowElement?: HTMLElement | null;

  @queryAssignedElements({ slot: 'target-element' })
  private targetElement?: Array<HTMLElement> | [];

  connectedCallback() {
    super.connectedCallback();
    window.requestAnimationFrame(() => {
      if (this.tooltipElement && this.arrowElement && this.targetElement?.[0]) {
        computePosition(this.targetElement[0], this.tooltipElement, {
          placement: this.placement,
          middleware: [arrow({ element: this.arrowElement }), offset(8)],
        }).then(({ x, y, middlewareData }) => {
          if (this.tooltipElement) {
            this.tooltipElement.style.left = `${x}px`;
            this.tooltipElement.style.top = `${y}px`;
          }
          this.arrowElement &&
            this.calculateArrowPosition(middlewareData, this.arrowElement);
        });
      }
    });

    if (this.hasAttribute('dismissible')) {
      this.dismissible = this.getAttribute('dismissible') !== 'false';
    }
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('width')) {
      this.style.setProperty('--tap-tooltip-width', this.width);
    }
  }

  private calculateArrowPosition(
    middlewareData: MiddlewareData,
    arrowEl: HTMLElement,
  ) {
    const side = this.placement.split('-')[0];
    const staticSide: string =
      {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[side] || 'top';

    if (middlewareData.arrow) {
      const { x, y } = middlewareData.arrow;
      Object.assign(arrowEl.style, {
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
        [staticSide]: `${-arrowEl.offsetWidth / 2}px`,
      });
    }
    if (this.arrowOffset) {
      if (side === 'top' || side === 'bottom') {
        arrowEl.style.left = `${this.arrowOffset}`;
      } else if (side === 'left' || side === 'right') {
        arrowEl.style.top = `${this.arrowOffset}`;
      }
    }
  }

  private handleDismiss() {
    const tooltipElement = this.renderRoot.querySelector(
      '#tooltip',
    ) as HTMLElement;
    tooltipElement.remove();
  }

  private renderDismissButton() {
    return this.dismissible
      ? html`
          <tap-icon-button
            @click=${() => this.handleDismiss()}
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

  private renderArrow() {
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

  render() {
    return html`
      <div id="tooltip" class="tooltip">
        ${this.renderDismissButton()}
        <div id="arrow" class="tooltip-icon">${this.renderArrow()}</div>
        <div class="tooltip-label">
          <slot name="label"></slot>
        </div>
      </div>
      <slot name="target-element"></slot>
    `;
  }
}
