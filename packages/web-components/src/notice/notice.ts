import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "../button";
import { close, error, info, success, warning } from "./icons";

export class Notice extends LitElement {
  @property({ type: String, attribute: "notice-title" })
  public noticeTitle? = "";

  @property()
  public variant: "success" | "error" | "info" | "warning" | "inverse" =
    "inverse";

  @property()
  public priority: "high" | "low" = "high";

  @property()
  public size: "standard" | "compacted" = "standard";

  @property({ type: Boolean, attribute: "dismissable" })
  public dismissable? = false;

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

  private _renderIcon() {
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
    this.dispatchEvent(
      new CustomEvent("dismiss", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _renderDismiss() {
    if (this.dismissable)
      return html`<tap-icon-button
        part="dismiss"
        class="dismiss"
        size="sm"
        variant="naked"
        id="dismiss"
        @click=${this._handleDismissClick}
      >
        ${close}
      </tap-icon-button>`;

    return nothing;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.variant]: true,
      [this.priority]: true,
      [this.size]: true,
    });

    return html`
      <div
        part="notice"
        id="notice"
        class=${rootClasses}
      >
        <span
          class="icon"
          id="icon"
          part="icon"
        >
          ${this._renderIcon()}
        </span>
        <div
          id="content-root"
          part="content-root"
          class="content-root"
        >
          ${this._renderTitle()}
          <p
            id="message"
            part="message"
            class="message"
          >
            <slot></slot>
          </p>
          <slot
            name="actions"
            part="actions"
          ></slot>
        </div>
        ${this._renderDismiss()}
      </div>
    `;
  }
}
