import { LitElement, html } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { type Chip } from "../chip/chip";

export class ChipGroup extends LitElement {
  @property({ type: String, reflect: true })
  public mode: "single-select" | "multi-select" = "single-select";

  @property({ type: Boolean, reflect: true })
  public fullwidth = false;

  @queryAssignedElements()
  private chips!: Chip[];

  public override connectedCallback() {
    super.connectedCallback();
    this.addEventListener("chip-click", this._handleChipClick);
  }

  private _handleChipClick(e: Event) {
    const clickedChip = e.target as Chip;

    if (!clickedChip || clickedChip.disabled) return;

    if (this.mode === "single-select") {
      this.chips.forEach(chip => {
        chip.selected = chip === clickedChip && !chip.selected;
      });
    } else if (this.mode === "multi-select") {
      clickedChip.selected = !clickedChip.selected;
    }

    const selectedChips = this.chips.filter(chip => chip.selected);

    this.dispatchEvent(
      new CustomEvent("chip-group-change", {
        detail: {
          selected: selectedChips,
          indices: selectedChips.map(chip => this.chips.indexOf(chip)),
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override render() {
    return html`
      <div
        aria-label="chip-group"
        role="group"
        class="chip-group"
        part="chip-group"
      >
        <slot></slot>
      </div>
    `;
  }
}
