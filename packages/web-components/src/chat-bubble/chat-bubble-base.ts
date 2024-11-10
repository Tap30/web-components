import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { logger } from "../utils";
import styles from "./chat-bubble-base.style";
import { AUTHORS, BaseSlots } from "./constants";

@customElement("tap-chat-bubble-base")
export class ChatBubbleBase extends LitElement {
  public static override readonly styles = [styles];

  @property({ type: String })
  public author: (typeof AUTHORS)[number] = "in";

  @property({ type: String })
  public timestamp = "";

  @property({ type: Boolean, attribute: "fully-rounded" })
  public fullyRounded = false;

  private _renderFooter() {
    if (!this.timestamp) {
      logger(
        `Expected valid \`timestamp\` prop. received: \`${this.timestamp}\`.`,
        "ChatBubble",
        "error",
      );

      return nothing;
    }

    return html`
      <div
        class="footer"
        part="footer"
      >
        <slot name=${BaseSlots.FOOTER}></slot>
        <span>${this.timestamp}</span>
      </div>
    `;
  }

  protected override render() {
    if (!AUTHORS.includes(this.author)) {
      logger(
        `Expected valid \`author\` prop. received: \`${this.author}\`.`,
        "ChatBubble",
        "error",
      );

      return nothing;
    }

    const rootClasses = classMap({
      "fully-rounded": this.fullyRounded,
      [this.author]: true,
    });

    return html`
      <div
        class="root ${rootClasses}"
        part="root"
      >
        <div
          class="body"
          part="body"
        >
          <slot name=${BaseSlots.BODY}></slot>
        </div>
        ${this._renderFooter()}
      </div>
    `;
  }
}
