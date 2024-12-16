import { html, LitElement, type TemplateResult } from "lit";
import type { DirectiveResult } from "lit/async-directive.js";
import { property } from "lit/decorators.js";
import { type ClassMapDirective } from "lit/directives/class-map.js";

abstract class BaseChatBubble extends LitElement {
  @property({ type: String })
  protected author: "in" | "out" = "in";

  /**
   * The timestamp of chat element.
   */
  @property({ type: String })
  public timestamp = "";

  /**
   * Whether or not the bubble should be fully rounded.
   */
  @property({ type: Boolean, attribute: "fully-rounded" })
  public fullyRounded = false;

  protected abstract renderPreContent(): TemplateResult | null;
  protected abstract renderFooterContent(): TemplateResult | null;
  protected abstract getRootClasses(): DirectiveResult<
    typeof ClassMapDirective
  >;

  protected override render() {
    const rootClasses = this.getRootClasses();

    return html`
      <div
        class=${rootClasses}
        part="root"
      >
        ${this.renderPreContent()}
        <div
          class="content"
          part="content"
        >
          <div
            class="body"
            part="body"
          >
            <slot></slot>
          </div>
          <div
            class="footer"
            part="footer"
          >
            ${this.renderFooterContent()}
            <span
              class="timestamp"
              part="timestamp"
            >
              ${this.timestamp}
            </span>
          </div>
        </div>
      </div>
    `;
  }
}

export default BaseChatBubble;
