import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { DeselectEvent, SelectEvent } from "../chip";
import { Chip } from "../chip/chip";
import { getRenderRootSlot, isSSR } from "../utils";
import { Slots } from "./constants";

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

  private _select(value: string) {
    const targetChip = this._chips.find(chip => {
      return chip.value === value;
    });

    if (!targetChip || targetChip.selected) return;

    this._selectedChips.push(value);

    targetChip.selected = true;
  }

  private _deselect(value: string) {
    const targetChip = this._chips.find(chip => {
      return chip.value === value;
    });

    if (!targetChip || !targetChip.selected) return;

    this._selectedChips = this._selectedChips.filter(chip => chip !== value);

    targetChip.selected = false;
  }

  private _handleChipDeselection(event: DeselectEvent) {
    const { chipValue } = event.details;

    this._deselect(chipValue);
  }

  private _handleChipSelection(event: SelectEvent) {
    const { chipValue } = event.details;

    this._select(chipValue);
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.orientation]: true,
      "full-width": this.fullWidth,
    });

    return html`
      <div
        role="group"
        class=${rootClasses}
        part="root"
        aria-orientation=${this.orientation}
      >
        <slot></slot>
      </div>
    `;
  }
}
