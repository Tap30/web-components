import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { logger } from "../utils";
import { AUTHORS, BaseSlots } from "./constants";

export class ChatBubbleBase extends LitElement {
  @property({ type: String, reflect: true })
  public author!: (typeof AUTHORS)[number];

  @property({ type: String, reflect: true })
  public timestamp!: string;

  @property({ type: Boolean, reflect: true, attribute: "fully-rounded" })
  public fullyRounded: boolean = false;

  constructor() {
    super();
  }

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

    return html`
      <div
        class="root"
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
