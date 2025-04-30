import { LitElement, type PropertyValues, html } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import isSsr from "../utils/is-ssr.ts";
import logger from "../utils/logger.ts";
import { ErrorMessages, Slots } from "./constants.ts";
import styles from "./discount-card.style.ts";

/**
 * @summary A component for displaying discount cards with various appearances.
 *
 * @tag tapsi-discount-card
 *
 * @slot [action] - The slot for actions associated with the component, typically a collection of `tapsi-button` components.
 * @slot [thumbnail] - The slot for custom image.
 * @slot [header-icon] - The slot for header icon.
 */
export class DiscountCard extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /**
   * The header title of the discount card.
   *
   * @prop {string} headerTitle
   * @attr {string} header-title
   * @default ""
   */
  @property({ attribute: "header-title" })
  public headerTitle = "";

  /**
   * The variant of the discount card.
   *
   * @prop {"clay" | "whisper" | "azure" | "flame" | "grayscale" | "none"} variant
   * @attr {"clay" | "whisper" | "azure" | "flame" | "grayscale" | "none"} variant
   * @default "none"
   */
  @property()
  public variant:
    | "clay"
    | "whisper"
    | "azure"
    | "flame"
    | "grayscale"
    | "none" = "none";

  /**
   * The title to use for the discount card.
   * Represents the title of the discount card.
   *
   * @prop {string} title
   * @attr {string} title
   * @default ""
   */
  @property()
  public override title = "";

  /**
   * The description of the discount card.
   *
   * @prop {string} description
   * @attr {string} description
   * @default ""
   */
  @property()
  public description = "";

  /**
   * The name/text to display in the badge.
   *
   * @prop {string} badgeText
   * @attr {string} badge-text
   * @default ""
   */
  @property({ attribute: "badge-text" })
  public badgeText = "";

  /**
   * The label for the expiry date of the discount.
   *
   * @prop {string} expiryDateLabel
   * @attr {string} expiry-date-label
   * @default ""
   */
  @property({ attribute: "expiry-date-label" })
  public expiryDateLabel = "";

  /**
   * Check if discount is expiring and if expiring is
   * true then turn expiry date label into red color.
   *
   * @prop {boolean} expiring
   * @attr {string} expiring
   * @default false
   */
  @property({ type: Boolean })
  public expiring: boolean = false;

  @state()
  private _hasHeaderIconSlot: boolean = false;

  @state()
  private _hasThumbnailSlot: boolean = false;

  @state()
  private _hasActionSlot: boolean = false;

  @queryAssignedNodes({ slot: Slots.ACTION })
  private _actionSlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.THUMBNAIL })
  private _thumbnailSlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.HEADER_ICON })
  private _headerIconSlotNodes!: Node[];

  private _handleActionSlotChange() {
    if (isSsr()) return;
    this._hasActionSlot = this._actionSlotNodes.length > 0;
  }

  private _handleThumbnailSlotChange() {
    if (isSsr()) return;
    this._hasThumbnailSlot = this._thumbnailSlotNodes.length > 0;
  }

  private _handleHeaderIconSlotChange() {
    if (isSsr()) return;
    this._hasHeaderIconSlot = this._headerIconSlotNodes.length > 0;
  }

  private _checkRequiredProps() {
    const isTransparent = this.variant === "none";

    if (!isTransparent && !this.headerTitle) {
      logger(
        ErrorMessages.HEADER_TITLE_IS_REQUIRED_WHEN_VARIANT_IS_NOT_NONE,
        "discount-card",
        "warning",
      );
    }

    if (!isTransparent && !this._hasHeaderIconSlot) {
      logger(
        ErrorMessages.HEADER_ICON_IS_REQUIRED_WHEN_VARIANT_IS_NOT_NONE,
        "discount-card",
        "warning",
      );
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

    this._handleActionSlotChange();
    this._handleHeaderIconSlotChange();
    this._handleThumbnailSlotChange();
  }

  protected override updated(changed: PropertyValues<this>) {
    super.update(changed);

    this._checkRequiredProps();
  }

  private _renderHeadSection() {
    const isTransparent = this.variant === "none";

    if (isTransparent) return null;

    return html`
      <div
        part="header"
        class="header"
      >
        <div
          part="header-title"
          class="header-title"
        >
          ${this.headerTitle}
        </div>

        <div
          ?hidden=${!this._hasHeaderIconSlot}
          part="header-icon"
          class="header-icon"
        >
          <slot
            @slotchange=${this._handleHeaderIconSlotChange}
            name=${Slots.HEADER_ICON}
          ></slot>
        </div>
      </div>
    `;
  }

  private _renderSideSection = () => {
    return html`
      <div class="side">
        <div
          class="badge-wrapper"
          part="badge-wrapper"
        >
          <div class="badge-box">${this.badgeText}</div>
          <div class="badge-shape">
            <svg
              viewBox="0 0 4 24"
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="24"
              fill="none"
            >
              <path
                fill="currentColor"
                d="m2 0 .204.01A2 2 0 0 1 4 2v19a3 3 0 0 1-3 3H0V0h2Z"
              />
            </svg>
          </div>
        </div>

        <div
          class="thumbnail-box"
          part="thumbnail-box"
          ?hidden=${!this._hasThumbnailSlot}
        >
          <slot
            @slotchange=${this._handleThumbnailSlotChange}
            name=${Slots.THUMBNAIL}
          ></slot>
        </div>

        <div class="dashed-line"></div>
      </div>
    `;
  };

  private _renderBodySection() {
    const expiryDateLabelClasses = classMap({
      "expiry-date-label": true,
      expiring: this.expiring,
    });

    return html`
      <div class="body">
        <div
          class="title"
          part="title"
        >
          ${this.title}
        </div>
        <div
          class="description"
          part="description"
        >
          ${this.description}
        </div>
        <div
          class=${expiryDateLabelClasses}
          part="expiry-date-label"
        >
          ${this.expiryDateLabel}
        </div>

        <div
          ?hidden=${!this._hasActionSlot}
          part="action"
          class="action"
        >
          <slot
            @slotchange=${this._handleActionSlotChange}
            name=${Slots.ACTION}
          ></slot>
        </div>
      </div>
    `;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [`variant-${this.variant}`]: true,
    });

    const wrapperClasses = classMap({
      wrapper: true,
    });

    return html`
      <div
        part="root"
        class=${rootClasses}
      >
        ${this._renderHeadSection()}
        <div class=${wrapperClasses}>
          ${this._renderSideSection()} ${this._renderBodySection()}
        </div>
      </div>
    `;
  }
}
