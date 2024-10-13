import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import {
  BASENAME,
  BaseSlots,
  InParts,
  STATUS_TO_ICON_MAP,
  STATUS_TO_LOCALE_MAP,
} from "./constants";

export class ChatBubbleIn extends LitElement {
  @property({ type: String, reflect: true })
  public timestamp!: string;

  @property({ type: String, reflect: true })
  public status?: "sent" | "seen" | "pending" | "failed";

  @property({ type: Boolean, reflect: true, attribute: "fully-rounded" })
  public fullyRounded: boolean = false;

  private _renderFailureIndicator() {
    if (this.status !== "failed") return nothing;

    const icon = STATUS_TO_ICON_MAP.failed;

    return html`
      <div
        class="${BASENAME}__failure-indicator"
        part=${InParts.FAILURE_INDICATOR}
      >
        ${icon}
      </div>
    `;
  }

  private _renderStatus() {
    if (!this.status || this.status === "failed") return nothing;

    const stateMessage = STATUS_TO_LOCALE_MAP[this.status];
    const icon = STATUS_TO_ICON_MAP[this.status];

    return html`
      <div
        slot=${BaseSlots.FOOTER}
        class="${BASENAME}__status"
        part=${InParts.STATUS}
      >
        ${icon}
        <span>${stateMessage}</span>
      </div>
    `;
  }

  protected override render() {
    return html`
      <div
        class="${BASENAME}"
        part=${InParts.ROOT}
      >
        ${this._renderFailureIndicator()}
        <tap-chat-bubble-base
          author="in"
          ?fully-rounded=${this.fullyRounded}
          timestamp=${this.timestamp}
        >
          <slot slot=${BaseSlots.BODY}></slot>
          ${this._renderStatus()}
        </tap-chat-bubble-base>
      </div>
    `;
  }
}
