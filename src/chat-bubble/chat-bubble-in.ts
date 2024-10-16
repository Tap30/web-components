import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
  BaseSlots,
  STATUS_TO_ICON_MAP,
  STATUS_TO_LOCALE_MAP,
  type STATES,
} from "./constants";

export class ChatBubbleIn extends LitElement {
  @property({ type: String })
  public timestamp!: string;

  @property({ type: String })
  public status?: (typeof STATES)[number];

  @property({ type: Boolean, attribute: "fully-rounded" })
  public fullyRounded: boolean = false;

  private _renderFailureIndicator() {
    if (this.status !== "failed") return nothing;

    const icon = STATUS_TO_ICON_MAP.failed;

    return html`
      <div
        class="failure-indicator"
        part="failure-indicator"
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
        class="status"
        part="status"
      >
        ${icon}
        <span>${stateMessage}</span>
      </div>
    `;
  }

  protected override render() {
    const rootClasses = classMap({
      [String(this.status)]: Boolean(this.status),
    });

    return html`
      <div
        class="root ${rootClasses}"
        part="root"
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