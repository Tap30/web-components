import "../../button/standard/index.ts";

import { html, LitElement, type PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import { logger } from "../../utils/index.ts";
import ItemSelectionController from "./Controller.ts";

export class SegmentedViewItem extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

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
    this._selectionController.handleSelectionChange();
  }

  /**
   * The value associated with the item.
   * This value has to be unique among sibling items.
   */
  @property({ type: String })
  public value: string = "";

  @query("#root")
  private _root!: HTMLElement | null;

  private readonly _selectionController = new ItemSelectionController(this);

  public override get tabIndex() {
    return this._root?.tabIndex ?? 0;
  }

  public override set tabIndex(newTabIndex: number) {
    const root = this._root;

    if (root) {
      if (root.tabIndex === newTabIndex) return;

      root.tabIndex = newTabIndex;
    } else this.removeAttribute("tabindex");
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (!this.value) {
      logger(
        `Expected a valid \`value\` property/attribute. Received \`${this.value}\`.`,
        "segmented-view-item",
        "error",
      );
    }
  }

  public override focus(options?: FocusOptions): void {
    this._root?.focus(options);
  }

  public override blur(): void {
    this._root?.blur();
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
        @click=${this._selectionController.handleClick}
        @keydown=${this._selectionController.handleKeyDown}
      >
        <slot></slot>
      </tapsi-button>
    `;
  }
}
