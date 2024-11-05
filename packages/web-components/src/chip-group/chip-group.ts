import { LitElement, html } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { type Chip } from "../chip/chip";

export class ChipGroup extends LitElement {
  @property({ type: String, attribute: "select-mode" })
  public selectMode: "single" | "multiple" = "single";

  @queryAssignedElements()
  private _chips!: Chip[];

  constructor() {
    super();

    this._handleChipClick = this._handleChipClick.bind(this);
  }

  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener("click", this._handleChipClick);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._handleChipClick);
  }

  private _handleChipClick(e: Event) {
    const clickedChip = e.target as Chip;

    if (!clickedChip || clickedChip.disabled) return;

    if (this.selectMode === "single") {
      this._chips.forEach(chip => {
        chip.selected = chip === clickedChip && !chip.selected;
      });
    } else if (this.selectMode === "multiple") {
      clickedChip.selected = !clickedChip.selected;
    }

    const selectedChips = this._chips.filter(chip => chip.selected);

    this.dispatchEvent(
      new CustomEvent("chip-group-change", {
        detail: {
          selected: selectedChips,
          indices: selectedChips.map(chip => this._chips.indexOf(chip)),
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override render() {
    return html`
      <div
        role="group"
        class="root"
        part="root"
      >
        <slot></slot>
      </div>
    `;
  }
}
