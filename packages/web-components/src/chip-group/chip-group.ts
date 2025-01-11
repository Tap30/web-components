import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { DeselectEvent, SelectEvent } from "../chip";
import { Chip } from "../chip/chip";
import { SynchronizeRequestEvent } from "../chip/events";
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

  private _selectedValues: string[] = [];

  private _initiallySynced = false;

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
    this._synchronize = this._synchronize.bind(this);
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

    this.addEventListener(SynchronizeRequestEvent.type, this._synchronize);
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

    this.removeEventListener(SynchronizeRequestEvent.type, this._synchronize);
  }

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    if (this._initiallySynced) return;

    const sync = () => {
      this._synchronize();

      this._initiallySynced = true;
    };

    if (!this.hasUpdated) void this.updateComplete.then(sync);
    else sync();
  }

  private _synchronize() {
    const chips = this._chips;
    const selectedChips = chips.filter(item => item.selected);

    if (selectedChips.length === 0 && this._selectedValues.length !== 0) {
      this._selectedValues = [];

      return;
    }

    if (selectedChips.length >= 1) {
      if (this.selectMode === "single") {
        if (
          this._selectedValues.length === 1 &&
          selectedChips.length === 1 &&
          this._selectedValues[0] === selectedChips[0]?.value
        ) {
          return;
        }

        const selectedValue = this._selectedValues[0];

        selectedChips.forEach(item => {
          if (item.value === selectedValue) return;

          item.selected = false;
        });

        this._selectedValues = selectedValue ? [selectedValue] : [];
      } else {
        this._selectedValues = selectedChips.map(chip => chip.value);
      }
    }
  }

  private _handleChipDeselection(event: DeselectEvent) {
    const chip = event.target as Chip;
    const value = chip.value;

    const selectedValues = this._selectedValues.filter(v => v !== value);

    this.dispatchEvent(new SelectChangeEvent({ values: selectedValues }));
  }

  private _handleChipSelection(event: SelectEvent) {
    const chip = event.target as Chip;
    const value = chip.value;

    if (this.selectMode === "multiple") {
      this._selectedValues = this._selectedValues.concat(value);
    } else this._selectedValues = [value];

    this.dispatchEvent(new SelectChangeEvent({ values: this._selectedValues }));
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
