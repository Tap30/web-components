import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "../button";
import { getRenderRootSlot, logger, runAfterRepaint } from "../utils";
import { Slots } from "./constants";
import { DismissEvent } from "./events";
import { close, error, info, success, warning } from "./icons";

export class Notice extends LitElement {
  public static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: "open",
  };

  @property({ type: String, attribute: "notice-title" })
  public noticeTitle? = "";

  @property()
  public variant: "success" | "error" | "info" | "warning" | "inverse" =
    "inverse";

  @property()
  public priority: "high" | "low" = "high";

  @property()
  public artwork: "none" | "icon" | "custom" = "icon";

  @property()
  public size: "standard" | "compact" = "standard";

  @property({ type: Boolean, attribute: "dismissable" })
  public dismissable = false;

  @state()
  private _hasCustomArtworkSlot = false;

  @state()
  private _hasActionsSlot = false;

  @state()
  private _hasDescriptionSlot = false;

  protected override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    runAfterRepaint(() => {
      const customArtworkSlot = getRenderRootSlot(
        this.renderRoot,
        Slots.ARTWORK,
      );

      const actionsSlot = getRenderRootSlot(this.renderRoot, Slots.ACTION);

      const descriptionSlot = getRenderRootSlot(
        this.renderRoot,
        Slots.DESCRIPTION,
      );

      if (customArtworkSlot) {
        this._hasCustomArtworkSlot =
          customArtworkSlot.assignedNodes().length > 0;
      }

      if (actionsSlot) {
        this._hasActionsSlot = actionsSlot.assignedNodes().length > 0;
      }

      if (descriptionSlot) {
        this._hasDescriptionSlot = descriptionSlot.assignedNodes().length > 0;
      }
    });

    this._logWarnings();
  }

  private _logWarnings() {
    if (this.artwork === "custom" && !this._hasCustomArtworkSlot) {
      logger(
        `Notice component with \`custom\` artwork property should have a \`${Slots.ARTWORK}\` slot`,
        "Notice",
        "warning",
      );
    }

    if (this.artwork !== "custom" && this._hasCustomArtworkSlot) {
      logger(
        `Notice component with \`${this.artwork}\` artwork property shouldn't have a \`${Slots.ARTWORK}\` slot`,
        "Notice",
        "warning",
      );
    }
  }

  private _renderDefaultIcon() {
    return html`
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.5 12C4.5 16.4183 8.08172 20 12.5 20C16.9183 20 20.5 16.4183 20.5 12C20.5 7.58172 16.9183 4 12.5 4C8.08172 4 4.5 7.58172 4.5 12ZM12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.5 12C9.5 13.6569 10.8431 15 12.5 15C14.1569 15 15.5 13.6569 15.5 12C15.5 10.3431 14.1569 9 12.5 9C10.8431 9 9.5 10.3431 9.5 12ZM12.5 7C9.73858 7 7.5 9.23858 7.5 12C7.5 14.7614 9.73858 17 12.5 17C15.2614 17 17.5 14.7614 17.5 12C17.5 9.23858 15.2614 7 12.5 7Z"
          fill="currentColor"
        />
      </svg>
    `;
  }

  private _renderIconArtwork() {
    if (this.variant === "success") return success;
    if (this.variant === "error") return error;
    if (this.variant === "info") return info;
    if (this.variant === "warning") return warning;

    return this._renderDefaultIcon();
  }

  private _renderTitle() {
    if (!this.noticeTitle) return nothing;

    return html`<p
      id="title"
      part="title"
      class="title"
    >
      ${this.noticeTitle}
    </p>`;
  }

  private _handleDismissClick() {
    this.dispatchEvent(new DismissEvent(null));
  }

  private _renderDismiss() {
    if (this.dismissable)
      return html`<tap-icon-button
        part="dismiss"
        size="sm"
        variant="naked"
        label="dismiss"
        id="dismiss"
        class="dismiss"
        @click=${this._handleDismissClick}
      >
        ${close}
      </tap-icon-button>`;

    return nothing;
  }

  private _renderDescription() {
    if (this.size === "compact") {
      return nothing;
    }

    return html`<p
      ?hidden=${!this._hasDescriptionSlot}
      class="description"
      part=${Slots.DESCRIPTION}
    >
      <slot name=${Slots.DESCRIPTION}></slot>
    </p>`;
  }

  private _renderArtwork() {
    if (this.artwork === "custom")
      return html` <slot name=${Slots.ARTWORK}></slot> `;

    if (this.artwork === "icon") return this._renderIconArtwork();

    return nothing;
  }

  private _renderActions() {
    return html`<div
      class="actions"
      ?hidden=${!this._hasActionsSlot || this.size === "compact"}
    >
      <slot
        name=${Slots.ACTION}
        part=${Slots.ACTION}
      ></slot>
    </div>`;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      dismissable: this.dismissable,
      [`${this.artwork}-artwork`]: true,
      [this.variant]: true,
      [this.priority]: true,
      [this.size]: true,
    });

    return html`
      <div
        role=${this.priority === "high" ? "alert" : "status"}
        part="notice"
        id="notice"
        class=${rootClasses}
        aria-label=${this.noticeTitle}
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
          ${this._renderTitle()} ${this._renderDescription()}
          ${this._renderActions()}
        </div>
        ${this._renderDismiss()}
      </div>
    `;
  }
}
