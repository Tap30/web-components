import "../avatar";

import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { BaseSlots } from "./constants";

export class ChatBubbleOut extends LitElement {
  @property({ type: String })
  public timestamp!: string;

  @property({ type: Boolean, attribute: "fully-rounded" })
  public fullyRounded: boolean = false;

  @property({ type: String, attribute: "avatar-src" })
  public avatarSrc?: string;

  private _renderAvatar() {
    if (!this.avatarSrc) return nothing;

    return html`
      <div
        class="avatar"
        part="avatar"
      >
        <tap-avatar
          image=${this.avatarSrc}
          size="xSmall"
        ></tap-avatar>
      </div>
    `;
  }

  protected override render() {
    const rootClasses = classMap({
      "has-avatar": Boolean(this.avatarSrc),
    });

    return html`
      <div
        class="root ${rootClasses}"
        part="root"
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
