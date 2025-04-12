import "../../avatar/index.ts";

import { html, type TemplateResult } from "lit";
import type { DirectiveResult } from "lit/async-directive";
import { property } from "lit/decorators.js";
import { classMap, type ClassMapDirective } from "lit/directives/class-map.js";
import { BaseChatBubble, baseStyles } from "../base/index.ts";
import styles from "./out.style.ts";

/**
 * @summary Displays the incoming chat message bubble.
 *
 * @tag tapsi-chat-bubble-out
 *
 * @slot - The default slot for the content.
 */
class ChatBubbleOut extends BaseChatBubble {
  /** @internal */
  public static override readonly styles = [baseStyles, styles];
  /**
   * The source of the avatar image.
   *
   * @prop {string} avatarSrc
   * @attr {string} avatar-src
   * @default ""
   */
  @property({ attribute: "avatar-src" })
  public avatarSrc = "";

  constructor() {
    super();

    this.author = "out";
  }

  protected override renderPreContent(): TemplateResult | null {
    if (!this.avatarSrc) return null;

    return html`
      <div
        class="avatar"
        part="avatar"
      >
        <tapsi-avatar
          image=${this.avatarSrc}
          size="sm"
        ></tapsi-avatar>
      </div>
    `;
  }

  protected override renderFooterContent(): TemplateResult | null {
    return null;
  }

  protected override getRootClasses(): DirectiveResult<
    typeof ClassMapDirective
  > {
    return classMap({
      root: true,
      [this.author]: true,
      "has-avatar": Boolean(this.avatarSrc),
      "fully-rounded": this.fullyRounded,
    });
  }
}

export default ChatBubbleOut;
