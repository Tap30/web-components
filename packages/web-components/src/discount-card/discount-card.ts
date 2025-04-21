import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import logger from "../utils/logger.ts";
import { Slots } from "./constants.ts";
import styles from "./discount-card.style.ts";

/**
 * @summary A component for displaying discount cards with various appearances
 *
 * @tag tapsi-discount-card
 *
 * @slot [action] - The slot for actions associated with the component, typically a collection of `tapsi-button` components.
 * @slot [thumbnail] - The slot for custom image.
 * @slot [header-icon] - The slot for header icon
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
  @property({ reflect: true })
  public variant:
    | "clay"
    | "whisper"
    | "azure"
    | "flame"
    | "grayscale"
    | "none" = "none";

  /**
   * The title to use for the discount-card.
   * Represents the title of the discount-card.
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
   * @prop {string} badgeName
   * @attr {string} badge-name
   * @default ""
   */
  @property({ attribute: "badge-name" })
  public badgeName = "";

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
   * Check if discount is expiring and if expiring is true then turn expiryDateLabel into red color
   *
   * @prop {boolean} expiring
   * @attr {string} expiring
    @default false
   */
  @property({ type: Boolean })
  public expiring: boolean = false;

  /**
   * Check for required props and emit warnings
   */
  private checkRequiredProps() {
    const isTransparent = this.variant === "none";

    // Check if header icon slot is filled
    const hasHeaderIcon = !!this.querySelector(`[slot="${Slots.HEADER_ICON}"]`);

    if (!isTransparent && !this.headerTitle) {
      logger(
        "headerTitle is required when variant is not none",
        "discount-card",
        "warning",
      );
    }

    if (!isTransparent && !hasHeaderIcon) {
      logger(
        "headerIcon is required when variant is not none",
        "discount-card",
        "warning",
      );
    }

    if (isTransparent && this.headerTitle) {
      logger(
        "headerTitle should not be provided when variant is none",
        "discount-card",
        "warning",
      );
    }

    if (isTransparent && hasHeaderIcon) {
      logger(
        "headerIcon should not be provided when variant is none",
        "discount-card",
        "warning",
      );
    }
  }

  /**
   * Lifecycle method that runs when the component is updated
   */
  protected override updated() {
    this.checkRequiredProps();
  }

  protected override render() {
    const isTransparent = this.variant === "none";
    const rootClasses = classMap({
      root: true,
      [`variant-${this.variant}`]: true,
    });

    const wrapperClasses = classMap({
      wrapper: true,
      "wrapper-border": isTransparent,
    });

    const expiryDateLabelClasses = classMap({
      "expiry-date-label": true,
      expiring: this.expiring,
    });

    return html`
      <div
        part="root"
        class=${rootClasses}
      >
        ${!isTransparent
          ? html`
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
                  part="header-icon"
                  class="header-icon"
                >
                  <slot name=${Slots.HEADER_ICON}> </slot>
                </div>
              </div>
            `
          : null}
        <div class=${wrapperClasses}>
          <div class="side">
            <div class="badge-wrapper">
              <div class="badge-box">${this.badgeName}</div>
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

            <div class="thumbnail-box">
              <slot name=${Slots.THUMBNAIL}></slot>
            </div>

            <div class="dashed-line"></div>
          </div>
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
              part="action"
              class="action"
            >
              <slot name=${Slots.ACTION}></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
