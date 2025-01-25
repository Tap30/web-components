import "../button/icon-button/index.ts";

import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { isSsr, logger } from "../utils/index.ts";
import { Slots } from "./constants.ts";
import { HideEvent, ShowEvent } from "./events.ts";
import { close, error, info, success, warning } from "./icons.ts";

export class Notice extends LitElement {
  public static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Indicates whether the notice is visible or not.
   */
  @property({ type: Boolean, reflect: true })
  public visible = false;

  /**
   * The title of the notice.
   */
  @property()
  public heading = "";

  /**
   * The description of the notice.
   */
  @property()
  public description = "";

  /**
   * The color of the notice, indicating the type of message.
   * Defaults to `info`.
   */
  @property()
  public color: "success" | "error" | "info" | "warning" = "info";

  /**
   * The priority level of the notice.
   * Defaults to `high`.
   *
   * High priority uses bolder colors and the role of `alert`
   * for screen readers, while low priority uses lighter colors
   * and the role of `status`.
   */
  @property()
  public priority: "high" | "low" = "high";

  /**
   * The artwork of the notice component.
   * Defaults to `icon`.
   *
   * Setting to `none` hides the artwork.
   * The `icon` value shows a default icon based on the color,
   * and `custom` enables the use of the `artwork` slot.
   */
  @property()
  public artwork: "none" | "icon" | "custom" = "icon";

  /**
   * The variant of the notice.
   * Defaults to `standard`.
   */
  @property()
  public variant: "standard" | "compact" = "standard";

  /**
   * Indicates whether the notice can be dismissed.
   */
  @property({ type: Boolean })
  public dismissible = false;

  @state()
  private _hasCustomArtworkSlot = false;

  @state()
  private _hasActionSlot = false;

  @queryAssignedNodes({ slot: Slots.ARTWORK })
  private _customArtworkSlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.ACTION })
  private _actionSlotNodes!: Node[];

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    this._handleArtworkSlotChange();
    this._handleActionSlotChange();
  }

  private _handleArtworkSlotChange() {
    if (!isSsr()) {
      this._hasCustomArtworkSlot = this._customArtworkSlotNodes.length > 0;

      if (this.artwork === "custom" && !this._hasCustomArtworkSlot) {
        logger(
          `Notice component with \`custom\` artwork property should have a \`${Slots.ARTWORK}\` slot`,
          "notice",
          "warning",
        );
      }

      if (this.artwork !== "custom" && this._hasCustomArtworkSlot) {
        logger(
          `Notice component with \`${this.artwork}\` artwork property shouldn't have a \`${Slots.ARTWORK}\` slot`,
          "notice",
          "warning",
        );
      }
    }
  }

  private _handleActionSlotChange() {
    if (!isSsr()) {
      this._hasActionSlot = this._actionSlotNodes.length > 0;
    }
  }

  /**
   * Forces the notice to display.
   */
  public show() {
    if (this.visible) return;

    this.visible = true;

    const eventAllowed = this.dispatchEvent(new ShowEvent());

    if (eventAllowed) this.visible = false;
  }

  /**
   * Forces the notice to hide.
   */
  public hide() {
    if (!this.visible) return;

    this.visible = false;

    const eventAllowed = this.dispatchEvent(new HideEvent());

    if (eventAllowed) this.visible = true;
  }

  private _renderDismiss() {
    if (!this.dismissible) return null;

    return html`
      <tapsi-icon-button
        part="dismiss"
        size="sm"
        variant="naked"
        label="Dismiss notice"
        id="dismiss"
        class="dismiss"
        @click=${() => this.hide()}
      >
        ${close}
      </tapsi-icon-button>
    `;
  }

  private _renderIconArtwork() {
    if (this.color === "success") return success;
    if (this.color === "error") return error;
    if (this.color === "info") return info;
    if (this.color === "warning") return warning;

    return null;
  }

  private _renderTitle() {
    if (!this.heading) return nothing;

    return html`
      <p
        id="title"
        part="title"
        class="title"
      >
        ${this.heading}
      </p>
    `;
  }

  private _renderDescription() {
    if (this.variant === "compact") return null;

    return html`
      <div
        class="description"
        part="description"
      >
        ${this.description}
      </div>
    `;
  }

  private _renderArtwork() {
    if (this.artwork === "custom") {
      return html`<slot
        @slotchange=${this._handleArtworkSlotChange}
        name=${Slots.ARTWORK}
      ></slot>`;
    }

    if (this.artwork === "icon") return this._renderIconArtwork();

    return null;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      dismissible: this.dismissible,
      [`${this.artwork}-artwork`]: true,
      [this.color]: true,
      [this.priority]: true,
      [this.variant]: true,
    });

    return html`
      <div
        role=${this.priority === "high" ? "alert" : "status"}
        part="root"
        id="root"
        class=${rootClasses}
        ?hidden=${!this.visible}
        aria-hidden=${!this.visible}
        aria-label=${this.heading || nothing}
        aria-describedby=${this.description || nothing}
      >
        <span
          class="artwork"
          id="artwork"
          part="artwork"
        >
          ${this._renderArtwork()}
        </span>
        <div
          id="content"
          part="content"
          class="content"
        >
          ${this._renderTitle()}${this._renderDescription()}
          <div
            class="actions"
            part="actions"
            ?hidden=${!this._hasActionSlot || this.variant === "compact"}
          >
            <slot
              @slotchange=${this._handleActionSlotChange}
              part=${Slots.ACTION}
              name=${Slots.ACTION}
            ></slot>
          </div>
        </div>
        ${this._renderDismiss()}
      </div>
    `;
  }
}
