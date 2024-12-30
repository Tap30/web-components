import "../../avatar";

import { html, type TemplateResult } from "lit";
import type { DirectiveResult } from "lit/async-directive";
import { property } from "lit/decorators.js";
import { classMap, type ClassMapDirective } from "lit/directives/class-map.js";
import { BaseChatBubble } from "../base";

class ChatBubbleOut extends BaseChatBubble {
  /**
   * The source of the avatar image.
   */
  @property({ type: String, attribute: "avatar-src" })
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
