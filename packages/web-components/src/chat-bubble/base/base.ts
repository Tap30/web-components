import { html, LitElement, type TemplateResult } from "lit";
import type { DirectiveResult } from "lit/async-directive.js";
import { property } from "lit/decorators.js";
import { type ClassMapDirective } from "lit/directives/class-map.js";

/**
 * @slot - The default slot for the content.
 */
abstract class BaseChatBubble extends LitElement {
  @property()
  protected author: "in" | "out" = "in";

  /**
   * The timestamp of chat element.
   *
   * @prop {string} timestamp
   * @attr {string} timestamp
   * @default ""
   */
  @property()
  public timestamp = "";

  /**
   * Whether or not the bubble should be fully rounded.
   *
   * @prop {boolean} fullyRounded
   * @attr {string} fully-rounded
   * @default false
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
