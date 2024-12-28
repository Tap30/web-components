import "../../button/standard";

import { html, LitElement, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { isSSR, logger, SystemError, waitAMicrotask } from "../../utils";
import SegmentedViewItemController from "./Controller";

export class SegmentedViewItem extends LitElement {
  private _active = false;

  /**
   * The size of the item.
   */
  @property()
  public size: "sm" | "md" = "md";

  /**
   * Identifies the element whose contents or presence
   * are controlled by this item.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tabpanel_role
   */
  @property()
  public controls = "";

  /**
   * Indicates whether the item is active or not.
   */
  @property({ type: Boolean })
  public get active() {
    return this._active;
  }

  public set active(isActive: boolean) {
    const prevActive = this.active;

    if (prevActive === isActive) return;

    this._active = isActive;
    this.requestUpdate("active", prevActive);
    this._controller.handleActiveChange();
  }

  /**
   * The value associated with the item.
   * This value has to be unique among sibling items.
   */
  @property({ type: String })
  public value: string = "";

  private readonly _controller = new SegmentedViewItemController(this);

  constructor() {
    super();

    this.addController(this._controller);

    if (!isSSR()) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this.addEventListener("focus", async event => {
        // allow event to propagate to user code after a microtask.
        await waitAMicrotask();

        if (event.defaultPrevented) return;

        this.focus();
      });
    }
  }

  private get _rootElement() {
    return this.renderRoot?.querySelector<HTMLElement>("#root") ?? null;
  }

  public override get tabIndex() {
    return this._rootElement?.tabIndex ?? 0;
  }

  public override set tabIndex(newTabIndex: number) {
    const root = this._rootElement;

    if (root) {
      if (root.tabIndex === newTabIndex) return;

      root.tabIndex = newTabIndex;
    } else this.removeAttribute("tabindex");
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (!this.value) {
      throw new SystemError(
        `Expected a valid \`value\` property/attribute. Received \`${this.value}\`.`,
        "segmented-view-item",
      );
    }
  }

  public override focus(options?: FocusOptions): void {
    this._rootElement?.focus(options);
  }

  public override blur(): void {
    this._rootElement?.blur();
  }

  protected override render() {
    if (!this.controls) {
      logger(
        [
          "Set `controls` attribute for better accessibility.",
          "This item should control an element with the `tabpanel` role" +
            " and an `aria-labelledby` attribute referencing this item.",
        ].join("\n"),
        "segmented-view-item",
        "warning",
      );
    }

    return html`
      <tapsi-button
        id="root"
        type="button"
        role="tab"
        part="root"
        class="root"
        size=${this.size}
        tabIndex=${this.tabIndex}
        variant=${this.active ? "elevated" : "naked"}
        aria-selected=${this.active ? "true" : "false"}
        aria-controls=${this.controls}
        data-value=${this.value}
      >
        <slot></slot>
      </tapsi-button>
    `;
  }
}
