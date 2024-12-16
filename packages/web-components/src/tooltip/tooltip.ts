import { arrow, computePosition, type Coords, offset } from "@floating-ui/dom";
import { html, LitElement, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { KeyboardKeys } from "../internals";
import { getRenderRootSlot, isSSR, waitAMicrotask } from "../utils";
import { Slots } from "./constants";
import { HideEvent, ShowEvent } from "./events";
import { dismiss } from "./icons";
import { rotateArrow, translate } from "./utils";

export class Tooltip extends LitElement {
  /**
   * Controls how to position the tooltip relative to the anchor.
   */
  @property({ type: String })
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

  /**
   * Whether tooltip is dismissable or not.
   */
  @property({ type: Boolean })
  public dismissible = false;

  /**
   * The text content of the tooltip.
   */
  @property({ type: String })
  public text = "";

  /**
   * Whether the tooltip is visible or not.
   */
  @property({ type: Boolean, reflect: true })
  public visible = false;

  /**
   * Whether to prevent showing tooltip on hover or not.
   */
  @property({ type: Boolean, attribute: "no-hover-activation" })
  public noHoverActivation = false;

  /**
   * Whether to prevent showing tooltip on focus or not.
   */
  @property({ type: Boolean, attribute: "no-focus-activation" })
  public noFocusActivation = false;

  /**
   * Whether to hide tooltip on escape or not.
   */
  @property({ type: Boolean, attribute: "no-escape-deactivation" })
  public noEscapeDeactivation = false;

  @query("#root")
  private _tooltipElement!: HTMLElement | null;

  @query("#arrow")
  private _arrowElement!: HTMLElement | null;

  @state()
  private _tooltipPosition: Coords = {
    x: 0,
    y: 0,
  };

  @state()
  private _arrowPosition: Coords = {
    x: 0,
    y: 0,
  };

  constructor() {
    super();

    if (!isSSR()) {
      this._handleKeyDown = this._handleKeyDown.bind(this);
      this._handleAnchorFocus = this._handleAnchorFocus.bind(this);
      this._handleAnchorBlur = this._handleAnchorBlur.bind(this);

      this.addEventListener(
        "focus",
        event => {
          const anchorElement = this._getAnchorElement();

          if (anchorElement !== event.target) return;

          void this._handleAnchorFocus(event);
        },
        true,
      );

      this.addEventListener(
        "blur",
        event => {
          const anchorElement = this._getAnchorElement();

          if (anchorElement !== event.target) return;

          void this._handleAnchorBlur(event);
        },
        true,
      );
    }
  }

  public override connectedCallback() {
    super.connectedCallback();

    if (!isSSR()) {
      void this.updateTooltipPosition();

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      document.addEventListener("keydown", this._handleKeyDown);
    }
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    document.removeEventListener("keydown", this._handleKeyDown);
    this._getAnchorElement()?.removeEventListener(
      "focus",
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this._handleAnchorFocus,
    );
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("placement")) void this.updateTooltipPosition();
  }

  /**
   * Forces the tooltip to display.
   */
  public show() {
    if (this.visible) return;

    const eventAllowed = this.dispatchEvent(new ShowEvent());

    if (eventAllowed) this.visible = true;
  }

  /**
   * Forces the tooltip to hide.
   */
  public hide() {
    if (!this.visible) return;

    const eventAllowed = this.dispatchEvent(new HideEvent());

    if (eventAllowed) this.visible = false;
  }

  /**
   * Calculates and updates the position of the tooltip based on
   * Its anchor element.
   */
  public async updateTooltipPosition() {
    const anchorElement = this._getAnchorElement();

    if (!anchorElement || !this._arrowElement || !this._tooltipElement) return;

    const { middlewareData, x, y } = await computePosition(
      anchorElement,
      this._tooltipElement,
      {
        placement: this.placement,
        middleware: [
          arrow({ element: this._arrowElement }),
          offset({ mainAxis: 8 }),
        ],
      },
    );

    this._tooltipPosition = { x, y };

    if (!middlewareData.arrow) return;

    // const side = (this.placement.split("-") as [Side, Alignment])[0] ?? "top";

    // if (!side) return;

    // const sidesMap: Record<Side, Side> = {
    //   top: "bottom",
    //   right: "left",
    //   bottom: "top",
    //   left: "right",
    // };

    // const staticSide = sidesMap[side];

    const { x: arrowX = NaN, y: arrowY = NaN } = middlewareData.arrow;

    const tooltipWidth = this._tooltipElement.offsetWidth;
    const arrowWidth = this._arrowElement.offsetWidth;
    const tooltipHeight = this._tooltipElement.offsetHeight;
    const arrowHeight = this._arrowElement.offsetHeight;

    let fallback = 0;

    if (this.placement.includes("bottom")) fallback = -arrowHeight;
    else if (this.placement.includes("right")) fallback = -arrowWidth;
    else if (this.placement.includes("top")) fallback = tooltipHeight;
    else if (this.placement.includes("left")) fallback = tooltipWidth;

    this._arrowPosition = {
      x: Number.isNaN(arrowX) ? fallback : arrowX,
      y: Number.isNaN(arrowY) ? fallback : arrowY,
    };
  }

  private _getAnchorElement() {
    const anchorSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    return (anchorSlot?.assignedElements()[0] ?? null) as HTMLElement | null;
  }

  private _updateAnchorAria() {
    const anchorElement = this._getAnchorElement();

    anchorElement?.setAttribute("aria-describedby", "root");
  }

  private async _handleKeyDown(event: KeyboardEvent) {
    if (!this.visible) return;
    if (this.noEscapeDeactivation) return;

    await waitAMicrotask();

    if (event.defaultPrevented) return;
    if (event.key !== KeyboardKeys.ESCAPE) return;

    event.preventDefault();

    this.hide();
  }

  private async _handleTriggerShowByEvent(event: Event) {
    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    this.show();
  }

  private async _handleTriggerHideByEvent(event: Event) {
    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    this.hide();
  }

  private async _handleAnchorFocus(event: FocusEvent) {
    if (this.noFocusActivation) return;

    await this._handleTriggerShowByEvent(event);
  }

  private async _handleAnchorBlur(event: FocusEvent) {
    if (this.noFocusActivation) return;

    await this._handleTriggerHideByEvent(event);
  }

  private async _handleAnchorMouseEnter(event: MouseEvent) {
    if (this.noHoverActivation) return;

    await this._handleTriggerShowByEvent(event);
  }

  private async _handleAnchorMouseLeave(event: MouseEvent) {
    if (this.noHoverActivation) return;

    await this._handleTriggerHideByEvent(event);
  }

  private _handleAnchorSlotChange() {
    this._updateAnchorAria();
    void this.updateTooltipPosition();
  }

  private _renderDismissButton() {
    if (!this.dismissible) return null;

    return html`
      <div
        role="button"
        class="dismiss"
        aria-label="Close the tooltip"
        @click=${() => this.hide()}
      >
        <span
          class="dismiss-icon"
          part="dismiss-icon"
        >
          ${dismiss}
        </span>
      </div>
    `;
  }

  protected override render() {
    const isVisible = isSSR() ? false : this.visible;

    const rootClasses = classMap({
      root: true,
      [this.placement]: true,
      visible: isVisible,
    });

    const rootStyles = styleMap({
      position: "absolute",
      top: 0,
      left: 0,
      transform: `${translate(this._tooltipPosition)}`,
    });

    const arrowStyles = styleMap({
      position: "absolute",
      top: 0,
      left: 0,
      transform: `${translate(this._arrowPosition)} ${rotateArrow(this.placement)}`,
    });

    return html`
      <div
        id="root"
        class=${rootClasses}
        style=${rootStyles}
        part="root"
        role="tooltip"
        aria-labelledby="text"
        aria-hidden=${!isVisible}
      >
        <span
          id="text"
          part="text"
          class="text"
        >
          ${this.text}
        </span>
        ${this._renderDismissButton()}
        <div
          id="arrow"
          part="arrow"
          class="arrow"
          style=${arrowStyles}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 5 10"
          >
            <path
              d="M5.0001 0V10L0.707205 5.70711C0.316681 5.31658 0.316682 4.68342 0.707206 4.29289L5.0001 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <!-- The anchor element -->
      <slot
        @slotchange=${this._handleAnchorSlotChange}
        @mouseenter=${this._handleAnchorMouseEnter}
        @mouseleave=${this._handleAnchorMouseLeave}
      ></slot>
    `;
  }
}
