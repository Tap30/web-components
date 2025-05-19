import { register as registerButton } from "../../button/standard/index.ts";

import {
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query } from "lit/decorators.js";
import { logger } from "../../utils/index.ts";
import ItemSelectionController from "./Controller.ts";
import styles from "./item.style.ts";

/**
 * @summary The item part of the segmented view.
 *
 * @tag tapsi-segmented-view-item
 *
 * @slot - The default slot for the content/label.
 */
export class SegmentedViewItem extends LitElement {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

  /** @internal */
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _active = false;

  /**
   * The size of the item.
   *
   * @prop {"sm" | "md"} size
   * @attr {"sm" | "md"} size
   * @default "md"
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
   *
   * @prop {string} controls
   * @attr {string} controls
   * @default ""
   */
  @property()
  public controls = "";

  /**
   * Indicates whether the item is active or not.
   *
   * @prop {boolean} active
   * @attr {string} active
   * @default false
   */
  @property({ type: Boolean })
  public get active(): boolean {
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
   *
   * @prop {string} value
   * @attr {string} value
   * @default ""
   */
  @property()
  public value: string = "";

  @query("#root", true)
  private _root!: HTMLElement | null;

  private readonly _selectionController = new ItemSelectionController(this);

  /** @internal */
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

  constructor() {
    super();

    registerButton();
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

  /** @internal */
  public override click(): void {
    this._root?.click();
  }

  /** @internal */
  public override focus(options?: FocusOptions): void {
    this._root?.focus(options);
  }

  /** @internal */
  public override blur(): void {
    this._root?.blur();
  }

  protected override render(): TemplateResult {
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
