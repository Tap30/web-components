import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { DeselectEvent, SelectEvent } from "../chip";
import { Chip } from "../chip/chip";
import { getRenderRootSlot, isSSR, logger } from "../utils";
import { Slots } from "./constants";
import { SelectChangeEvent } from "./events";

export class ChipGroup extends LitElement {
  /**
   * The select mode of the chip group.
   */
  @property({ type: String, attribute: "select-mode" })
  public selectMode: "single" | "multiple" = "single";

  /**
   * The orientation of the chip group.
   */
  @property({ type: String })
  public orientation: "horizontal" | "vertical" = "horizontal";

  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  /**
   * Indicates if the chip should be full width.
   */
  @property({ type: Boolean, attribute: "full-width" })
  public fullWidth = false;

  private get _chips() {
    const chipsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!chipsSlot) return [];

    const chips = chipsSlot
      .assignedNodes()
      .filter(node => node instanceof Chip);

    return chips;
  }

  private get _selectedChips() {
    return this._chips.filter(node => node.selected);
  }

  constructor() {
    super();

    if (!isSSR()) {
      this._handleChipSelection = this._handleChipSelection.bind(this);
      this._handleChipDeselection = this._handleChipDeselection.bind(this);
    }
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

  private _handleChipDeselection(event: DeselectEvent) {
    const chip = event.target as Chip;
    const value = chip.value;

    const selectedValues = this._selectedChips
      .map(chip => chip.value)
      .filter(v => v !== value);

    this.dispatchEvent(new SelectChangeEvent({ values: selectedValues }));
  }

  private _handleChipSelection(event: SelectEvent) {
    const chip = event.target as Chip;
    const value = chip.value;

    const selectedValues = this._selectedChips
      .map(chip => chip.value)
      .concat(value);

    this.dispatchEvent(new SelectChangeEvent({ values: selectedValues }));
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.orientation]: true,
      "full-width": this.fullWidth,
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
