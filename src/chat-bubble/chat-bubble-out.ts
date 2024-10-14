import "../avatar";

import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { BaseSlots, OutParts } from "./constants";

export class ChatBubbleOut extends LitElement {
  @property({ type: String, reflect: true })
  public timestamp!: string;

  @property({ type: Boolean, reflect: true, attribute: "fully-rounded" })
  public fullyRounded: boolean = false;

  @property({ type: String, reflect: true, attribute: "avatar-src" })
  public avatarSrc?: string;

  private _renderAvatar() {
    if (!this.avatarSrc) return nothing;

    return html`
      <div
        class=${OutParts.AVATAR}
        part=${OutParts.AVATAR}
      >
        <tap-avatar
          image=${this.avatarSrc}
          size="xSmall"
        ></tap-avatar>
      </div>
    `;
  }

  protected override render() {
    return html`
      <div
        class=${OutParts.ROOT}
        part=${OutParts.ROOT}
      >
        ${this._renderAvatar()}
        <tap-chat-bubble-base
          author="out"
          ?fully-rounded=${this.fullyRounded}
          timestamp=${this.timestamp}
        >
          <slot slot=${BaseSlots.BODY}></slot>
        </tap-chat-bubble-base>
      </div>
    `;
  }
}
