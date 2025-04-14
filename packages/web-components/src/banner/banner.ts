import { LitElement, type PropertyValues, html } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { isSsr } from "../utils/index.ts";
import styles from "./banner.style.ts";
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_TEXT_COLOR,
  Slots,
} from "./constants.ts";

/**
 * @summary Used to display a visual promotional message.
 *
 * @tag tapsi-banner
 *
 * @slot - The default slot to render extra elements when variant is `hero`.
 * @slot [action] - The slot for action element.
 */
export class Banner extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /**
   * The heading text to display in the banner.
   *
   * @prop {string} heading
   * @attr {string} heading
   */
  @property()
  public heading?: string;

  /**
   * The description text to display in the banner.
   *
   * @prop {string} description
   * @attr {string} description
   */
  @property()
  public description?: string;

  /**
   * The URL of the background image to display in the banner.
   *
   * @prop {string} image
   * @attr {string} image
   */
  @property()
  public image?: string;

  /**
   * The variant style of the banner.
   *
   * @prop {"default" | "hero"} variant
   * @attr {"default" | "hero"} variant
   * @default "default"
   */
  @property()
  public variant: "default" | "hero" = "default";

  /**
   * The background color of the banner.
   *
   * @prop {string} backgroundColor
   * @attr {string} background-color
   * @default "var(--tapsi-color-surface-secondary)"
   */
  @property({ attribute: "background-color" })
  public backgroundColor?: string = DEFAULT_BACKGROUND_COLOR;

  /**
   * The text color of the banner.
   *
   * @prop {string} textColor
   * @attr {string} text-color
   * @default "var(--tapsi-color-content-primary)"
   */
  @property({ attribute: "text-color" })
  public textColor?: string = DEFAULT_TEXT_COLOR;

  @state()
  private _hasActionSlot = false;

  @queryAssignedNodes({ slot: Slots.ACTION })
  private _actionSlotNodes!: Node[];

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has("backgroundColor")) {
      const token = "--banner-color-surface";

      this.style.setProperty(
        token,
        this.backgroundColor ? this.backgroundColor : DEFAULT_BACKGROUND_COLOR,
      );
    }

    if (changed.has("textColor")) {
      const token = "--banner-color-content";

      this.style.setProperty(
        token,
        this.textColor ? this.textColor : DEFAULT_TEXT_COLOR,
      );
    }

    if (changed.has("image")) {
      const token = "--banner-background-image";

      if (this.image) {
        this.style.setProperty(token, `url(${this.image})`);
      } else {
        this.style.removeProperty(token);
      }
    }
  }

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);
    this._handleActionSlotChange();
  }

  private _handleActionSlotChange() {
    if (!isSsr()) {
      this._hasActionSlot = this._actionSlotNodes.length > 0;
    }
  }

  private _renderHeading() {
    if (!this.heading) return null;

    return html`
      <strong
        class="heading"
        part="heading"
      >
        ${this.heading}
      </strong>
    `;
  }

  private _renderDescription() {
    if (!this.description) return null;

    return html`
      <div
        class="description"
        part="description"
      >
        ${this.description}
      </div>
    `;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.variant]: true,
    });

    return html`
      <div
        role="banner"
        class=${rootClasses}
        part="root"
      >
        <div class="content">
          ${this._renderHeading()}${this._renderDescription()}
          <div
            class=${Slots.ACTION}
            part=${Slots.ACTION}
            ?hidden=${!this._hasActionSlot}
          >
            <slot
              @slotchange=${this._handleActionSlotChange}
              name=${Slots.ACTION}
            ></slot>
          </div>
        </div>
      </div>
    `;
  }
}
