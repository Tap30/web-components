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

  /**
   * The value of the currently selected chips.
   */
  @property({ attribute: false })
  public get selectedChips(): string[] {
    return this._selectedChips;
  }

  public set selectedChips(values: string[]) {
    if (isSSR()) return;

    this._chips.forEach(chip => {
      if (values.includes(chip.value)) {
        chip.selected = true;
      } else {
        chip.selected = false;
      }
    });

    this._selectedChips = values;
  }

  private get _chips() {
    const chipsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!chipsSlot) return [];

    const chips = chipsSlot
      .assignedNodes()
      .filter(node => node instanceof Chip);

    return chips;
  }

  private _selectedChips: string[] = [];

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

  private _emitSelectChange(selectedValues: string[]) {
    const prevSelectedChips = this.selectedChips;

    this.selectedChips = selectedValues;

    const eventAllowed = this.dispatchEvent(
      new SelectChangeEvent({ selectedChips: selectedValues }),
    );

    if (!eventAllowed) this.selectedChips = prevSelectedChips;
  }

  private _select(value: string) {
    const targetChip = this._chips.find(chip => {
      return chip.value === value;
    });

    if (!targetChip || targetChip.selected) return;

    const newSelectedChips = [...this.selectedChips, value];

    this._emitSelectChange(newSelectedChips);
  }

  private _deselect(value: string) {
    const targetChip = this._chips.find(chip => {
      return chip.value === value;
    });

    if (!targetChip || !targetChip.selected) return;

    const newSelectedChips = this.selectedChips.filter(chip => chip !== value);

    this._emitSelectChange(newSelectedChips);
  }

  private _handleChipDeselection(event: DeselectEvent) {
    const chip = event.target as Chip;

    this._deselect(chip.value);
  }

  private _handleChipSelection(event: SelectEvent) {
    const chip = event.target as Chip;

    this._select(chip.value);
  }

  private _handleSlotChange() {
    const chips = this._chips;

    let didFilter = false;

    const filtered = this.selectedChips.filter(chipValue => {
      const accepted = chips.some(chip => chip.value === chipValue);

      if (!accepted) didFilter = true;

      return accepted;
    });

    if (didFilter) this._emitSelectChange(filtered);
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
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
