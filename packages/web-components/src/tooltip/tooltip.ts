import { arrow, computePosition, offset, type Coords } from "@floating-ui/dom";
import {
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { KeyboardKeys } from "../internals/index.ts";
import { isSsr, waitAMicrotask } from "../utils/index.ts";
import { HideEvent, ShowEvent } from "./events.ts";
import { dismiss } from "./icons.ts";
import styles from "./tooltip.style.ts";
import { rotateArrow, translate } from "./utils.ts";

interface TapsiTooltipEventMap extends HTMLElementEventMap {
  [HideEvent.type]: HideEvent;
  [ShowEvent.type]: ShowEvent;
}

/**
 * @summary A simple text popup box.
 *
 * @tag tapsi-tooltip
 *
 * @fires {ShowEvent} show - Fires when the tooltip should be visible. (cancelable)
 * @fires {HideEvent} hide - Fires when the tooltip should be hidden. (cancelable)
 */
export class Tooltip extends LitElement {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

  /** @internal */
  declare addEventListener: <K extends keyof TapsiTooltipEventMap>(
    type: K,
    listener: (this: Tooltip, ev: TapsiTooltipEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /** @internal */
  declare removeEventListener: <K extends keyof TapsiTooltipEventMap>(
    type: K,
    listener: (this: Tooltip, ev: TapsiTooltipEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;

  /**
   * Controls how to position the tooltip relative to the anchor.
   *
   * @prop {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"} placement
   * @attr {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"} placement
   * @default "top"
   */
  @property()
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
   *
   * @prop {boolean} dismissible
   * @attr {string} dismissible
   * @default false
   */
  @property({ type: Boolean })
  public dismissible = false;

  /**
   * The text content of the tooltip.
   *
   * @prop {string} text
   * @attr {string} text
   * @default ""
   */
  @property()
  public text = "";

  /**
   * The id of the anchor element.
   *
   * @prop {string} anchor
   * @attr {string} anchor
   * @default ""
   */
  @property()
  public anchor = "";

  /**
   * Whether the tooltip is visible or not.
   *
   * @prop {boolean} visible
   * @attr {string} visible
   * @default false
   */
  @property({ type: Boolean })
  public visible = false;

  /**
   * Whether to prevent showing tooltip on hover or not.
   *
   * @prop {boolean} noHoverActivation
   * @attr {string} no-hover-activation
   * @default false
   */
  @property({ type: Boolean, attribute: "no-hover-activation" })
  public noHoverActivation = false;

  /**
   * Whether to prevent showing tooltip on focus or not.
   *
   * @prop {boolean} noFocusActivation
   * @attr {string} no-focus-activation
   * @default false
   */
  @property({ type: Boolean, attribute: "no-focus-activation" })
  public noFocusActivation = false;

  /**
   * Whether to hide tooltip on escape or not.
   *
   * @prop {boolean} noEscapeDeactivation
   * @attr {string} no-escape-deactivation
   * @default false
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

    if (!isSsr()) {
      this._handleKeyDown = this._handleKeyDown.bind(this);
      this._handleAnchorMouseEnter = this._handleAnchorMouseEnter.bind(this);
      this._handleAnchorMouseLeave = this._handleAnchorMouseLeave.bind(this);
    }
  }

  /** @internal */
  public override connectedCallback(): void {
    super.connectedCallback();

    if (!isSsr()) {
      void this.updateTooltipPosition();

      /* eslint-disable @typescript-eslint/no-misused-promises */
      document.addEventListener("keydown", this._handleKeyDown);

      const anchor = this._getAnchorElement();

      if (!anchor) return;

      anchor.addEventListener("mouseenter", this._handleAnchorMouseEnter);
      anchor.addEventListener("mouseleave", this._handleAnchorMouseLeave);
      /* eslint-enable @typescript-eslint/no-misused-promises */
    }
  }

  /** @internal */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    /* eslint-disable @typescript-eslint/no-misused-promises */
    document.removeEventListener("keydown", this._handleKeyDown);

    const anchor = this._getAnchorElement();

    if (!anchor) return;

    anchor.removeEventListener("mouseenter", this._handleAnchorMouseEnter);
    anchor.removeEventListener("mouseleave", this._handleAnchorMouseLeave);
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has("placement")) void this.updateTooltipPosition();
  }

  /**
   * Forces the tooltip to display.
   */
  public show(): void {
    if (this.visible) return;

    const eventAllowed = this.dispatchEvent(new ShowEvent());

    if (eventAllowed) this.visible = true;
  }

  /**
   * Forces the tooltip to hide.
   */
  public hide(): void {
    if (!this.visible) return;

    const eventAllowed = this.dispatchEvent(new HideEvent());

    if (eventAllowed) this.visible = false;
  }

  /**
   * Calculates and updates the position of the tooltip based on
   * Its anchor element.
   */
  public async updateTooltipPosition(): Promise<void> {
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
    return document.getElementById(this.anchor);
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

  private async _handleAnchorMouseEnter(event: MouseEvent) {
    if (this.noHoverActivation) return;

    await this._handleTriggerShowByEvent(event);
  }

  private async _handleAnchorMouseLeave(event: MouseEvent) {
    if (this.noHoverActivation) return;

    await this._handleTriggerHideByEvent(event);
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

  protected override render(): TemplateResult {
    const isVisible = isSsr() ? false : this.visible;

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
    `;
  }
}
