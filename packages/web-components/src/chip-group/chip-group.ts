import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Chip } from "../chip/chip.ts";
import { eventsMap } from "../chip/index.ts";
import { getRenderRootSlot, logger } from "../utils/index.ts";
import styles from "./chip-group.style.ts";
import { Slots } from "./constants.ts";
import { SelectChangeEvent } from "./events.ts";

interface TapsiChipGroupEventMap extends HTMLElementEventMap {
  [SelectChangeEvent.type]: SelectChangeEvent;
}

/**
 * @summary The ChipGroup component can be used to group related chips.
 *
 * @tag tapsi-chip-group
 *
 * @slot - Default slot for the content of chip.
 *
 * @fires {SelectChangeEvent} selectchange - Fired when the chip selection state changes. (bubbles).
 */
export class ChipGroup extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /** @internal */
  declare addEventListener: <K extends keyof TapsiChipGroupEventMap>(
    type: K,
    listener: (this: ChipGroup, ev: TapsiChipGroupEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /** @internal */
  declare removeEventListener: <K extends keyof TapsiChipGroupEventMap>(
    type: K,
    listener: (this: ChipGroup, ev: TapsiChipGroupEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;

  /**
   * The select mode of the chip group.
   *
   * @prop {"multiple" | "single"} selectMode
   * @attr {"multiple" | "single"} select-mode
   * @default "multiple"
   */
  @property({ attribute: "select-mode" })
  public selectMode: "single" | "multiple" = "multiple";

  /**
   * Determines if chip selection is required.
   *
   * @prop {boolean} selectionRequired
   * @attr {string} selection-required
   * @default false
   */
  @property({ type: Boolean, attribute: "selection-required" })
  public selectionRequired = false;

  /**
   * The orientation of the chip group.
   *
   * @prop {"horizontal" | "vertical"} orientation
   * @attr {"horizontal" | "vertical"} orientation
   * @default "horizontal"
   */
  @property()
  public orientation: "horizontal" | "vertical" = "horizontal";

  /**
   * Determines the number of columns of chips the parent will wrap.
   * This property is only used when orientation is set to "vertical".
   *
   * @prop {number} cols
   * @attr {string} cols
   * @default 2
   */
  @property({ type: Number })
  public cols = 2;

  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   *
   * @prop {string} label
   * @attr {string} label
   * @default ""
   */
  @property()
  public label = "";

  private get _chips() {
    const chipsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!chipsSlot) return [];

    const chips = chipsSlot
      .assignedNodes()
      .filter(node => node instanceof Chip);

    return chips;
  }

  constructor() {
    super();

    this._handleChipSelection = this._handleChipSelection.bind(this);
    this._handleChipDeselection = this._handleChipDeselection.bind(this);
  }

  /** @internal */
  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      eventsMap.select.type,
      this._handleChipSelection as EventListener,
    );

    this.addEventListener(
      // @ts-expect-error its internal event name.
      eventsMap.deselect.type,
      this._handleChipDeselection as EventListener,
    );
  }

  /** @internal */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(
      eventsMap.select.type,
      this._handleChipSelection as EventListener,
    );

    this.removeEventListener(
      // @ts-expect-error its internal event name.
      eventsMap.deselect.type,
      this._handleChipDeselection as EventListener,
    );
  }

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    if (changed.has("cols")) {
      this.style.setProperty("--chips-cols", String(this.cols));
    }
  }

  private _handleChipDeselection() {
    const selectedValues = this._chips
      .filter(chip => chip.selected)
      .map(chip => chip.value);

    this.dispatchEvent(new SelectChangeEvent({ values: selectedValues }));
  }

  private _handleChipSelection() {
    const selectedValues = this._chips
      .filter(chip => chip.selected)
      .map(chip => chip.value);

    this.dispatchEvent(new SelectChangeEvent({ values: selectedValues }));
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.orientation]: true,
    });

    if (!this.label) {
      logger(
        "Set `label` attribute for better accessibility.",
        "chip-group",
        "warning",
      );
    }

    return html`
      <div
        role="group"
        class=${rootClasses}
        part="root"
        aria-orientation=${this.orientation}
        aria-label=${this.label || nothing}
      >
        <slot></slot>
      </div>
    `;
  }
}
