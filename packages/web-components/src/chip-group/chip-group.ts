import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { DeselectEvent, SelectEvent } from "../chip";
import { Chip } from "../chip/chip";
import { getRenderRootSlot, logger } from "../utils";
import { Slots } from "./constants";
import { SelectChangeEvent } from "./events";

export class ChipGroup extends LitElement {
  /**
   * The select mode of the chip group.
   */
  @property({ type: String, attribute: "select-mode" })
  public selectMode: "single" | "multiple" = "multiple";

  /**
   * Determines if chip selection is required.
   */
  @property({ type: Boolean, attribute: "selection-required" })
  public selectionRequired = false;

  /**
   * The orientation of the chip group.
   */
  @property({ type: String })
  public orientation: "horizontal" | "vertical" = "horizontal";

  /**
   * Determines the number of columns of chips the parent will wrap.
   * This property is only used when orientation is set to "vertical".
   */
  @property({ type: Number })
  public cols = 2;

  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
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

  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      SelectEvent.type,
      this._handleChipSelection as EventListener,
    );

    this.addEventListener(
      DeselectEvent.type,
      this._handleChipDeselection as EventListener,
    );
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(
      SelectEvent.type,
      this._handleChipSelection as EventListener,
    );

    this.removeEventListener(
      DeselectEvent.type,
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
