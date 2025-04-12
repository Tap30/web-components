import { html, LitElement, type PropertyValues } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { isSsr, logger } from "../utils/index.ts";
import styles from "./chip.style.ts";
import { Slots } from "./constants.ts";
import ChipSelectionController from "./Controller.ts";
import type { DeselectEvent, SelectEvent } from "./events.ts";

interface TapsiChipEventMap extends HTMLElementEventMap {
  [SelectEvent.type]: SelectEvent;
  [DeselectEvent.type]: DeselectEvent;
}

/**
 * @summary Chips are compact elements that represent an input, attribute, or action.
 *
 * @tag tapsi-chip
 *
 * @slot - Default content slot for chip text.
 * @slot [leading-icon] - The slot for an optional leading icon.
 * @slot [trailing-icon] - The slot for an optional trailing icon.
 *
 * @fires {SelectEvent} select - Fired when the chip is selected (bubbles).
 * @fires {DeselectEvent} deselect - Fired when the chip is deselected (bubbles).
 */
export class Chip extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /** @internal */
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** @internal */
  declare addEventListener: <K extends keyof TapsiChipEventMap>(
    type: K,
    listener: (this: Chip, ev: TapsiChipEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /** @internal */
  declare removeEventListener: <K extends keyof TapsiChipEventMap>(
    type: K,
    listener: (this: Chip, ev: TapsiChipEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;

  private _selected = false;

  /**
   * Whether the chip is selected or not.
   *
   * @prop {boolean} selected
   * @attr {string} selected
   * @default false;
   */
  @property({ type: Boolean, reflect: true })
  public get selected() {
    return this._selected;
  }

  public set selected(isSelected: boolean) {
    const prevSelected = this.selected;

    if (prevSelected === isSelected) return;

    this._selected = isSelected;
    this.requestUpdate("selected", prevSelected);
    this._selectionController.handleSelectionChange();
  }

  /**
   * Whether the chip is disabled or not.
   *
   * @prop {boolean} disabled
   * @attr {string} disabled
   * @default false;
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The size of the chip.
   *
   * @prop {"sm" | "md"} size
   * @attr {"sm" | "md"} size
   * @default "md";
   */
  @property()
  public size: "sm" | "md" = "md";

  /**
   * The value associated with the chip.
   *
   * @prop {string} value
   * @attr {string} value
   * @default "";
   */
  @property()
  public value: string = "";

  @state()
  private _hasTrailingIconSlot = false;

  @state()
  private _hasLeadingIconSlot = false;

  @queryAssignedNodes({ slot: Slots.LEADING_ICON })
  private _leadingIconSlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.TRAILING_ICON })
  private _trailingIconSlotNodes!: Node[];

  private readonly _selectionController = new ChipSelectionController(this);

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    if (changed.has("value") && !this.value) {
      logger(
        `Expected a valid \`value\` property/attribute. Received \`${this.value}\`.`,
        "chip",
        "error",
      );
    }

    this._handleLeadingIconSlotChange();
    this._handleTrailingIconSlotChange();
  }

  private _handleLeadingIconSlotChange() {
    if (!isSsr()) {
      this._hasLeadingIconSlot = this._leadingIconSlotNodes.length > 0;
    }
  }

  private _handleTrailingIconSlotChange() {
    if (!isSsr()) {
      this._hasTrailingIconSlot = this._trailingIconSlotNodes.length > 0;
    }
  }

  /** @internal */
  public override focus(options?: FocusOptions): void {
    this.renderRoot.querySelector<HTMLElement>("#root")?.focus(options);
  }

  /** @internal */
  public override blur(): void {
    this.renderRoot.querySelector<HTMLElement>("#root")?.blur();
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.size]: true,
      disabled: this.disabled,
      selected: this.selected,
      "has-leading-icon": this._hasLeadingIconSlot,
      "has-trailing-icon": this._hasTrailingIconSlot,
    });

    return html`
      <button
        id="root"
        class=${rootClasses}
        part="root"
        ?disabled=${this.disabled}
        tabindex="${this.disabled ? "-1" : "0"}"
        aria-label=${ifDefined(this.ariaLabel ?? undefined)}
        aria-pressed=${this.selected}
        @click=${this._selectionController.handleClick}
        @keydown=${this._selectionController.handleKeyDown}
      >
        <div
          class="icon leading-icon"
          part="leading-icon"
        >
          <slot
            @slotchange=${this._handleLeadingIconSlotChange}
            name=${Slots.LEADING_ICON}
          ></slot>
        </div>
        <div
          class="content"
          part="content"
        >
          <slot></slot>
        </div>
        <div
          class="icon trailing-icon"
          part="trailing-icon"
        >
          <slot
            @slotchange=${this._handleTrailingIconSlotChange}
            name=${Slots.TRAILING_ICON}
          ></slot>
        </div>
      </button>
    `;
  }
}
