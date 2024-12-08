import { html, LitElement, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { getRenderRootSlot, runAfterRepaint, SystemError } from "../../utils";
import Controller from "./Controller";
import { Slots } from "./constants";

export class BottomNavigationItem extends LitElement {
  /**
   * Indicates whether the item is active or not.
   */
  @property({ type: Boolean, reflect: true })
  public active = false;

  /**
   * The value associated with the item.
   * This value has to be unique among sibling items.
   */
  @property({ type: String })
  public value: string = "";

  @state()
  private _hasIcon = false;

  private readonly _controller = new Controller(this);

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (!this.value) {
      throw new SystemError(
        `Expected a valid \`value\` property/attribute. Received \`${this.value}\`.`,
        "bottom-navigation-item",
      );
    }

    runAfterRepaint(() => {
      const iconSlot = getRenderRootSlot(this.renderRoot, Slots.ICON);

      if (!iconSlot) return;

      this._hasIcon = iconSlot.assignedNodes().length > 0;
    });
  }

  public override focus(options?: FocusOptions): void {
    this.renderRoot?.querySelector<HTMLElement>("#root")?.focus(options);
  }

  public override blur(): void {
    this.renderRoot?.querySelector<HTMLElement>("#root")?.blur();
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      active: this.active,
    });

    return html`
      <button
        type="button"
        part="root"
        class=${rootClasses}
        aria-selected=${this.active ? "true" : "false"}
        data-value=${this.value}
        @click=${this._controller.handleClick}
        @keydown=${this._controller.handleKeyDown}
      >
        <div
          aria-hidden
          class=${Slots.ICON}
          part=${Slots.ICON}
          ?hidden=${!this._hasIcon}
        >
          <slot name=${Slots.ICON}></slot>
        </div>
        <div
          class="content"
          part="content"
        >
          <slot></slot>
        </div>
      </button>
    `;
  }
}
