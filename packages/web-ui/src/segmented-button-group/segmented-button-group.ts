import { LitElement, html, nothing } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { type SegmentedButton } from "../segmented-button/segmented-button.js";

export class SegmentedButtonGroup extends LitElement {
  @property({ reflect: true })
  public size: "sm" | "md" = "md";

  @queryAssignedElements()
  private _buttons!: SegmentedButton[];

  public override connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      "segmented-button-click",
      this._handleSegmentedButtonClick,
    );
  }

  private _handleSlotChange() {
    const selected = this._buttons.find(button => button.selected);

    if (!selected) {
      const button = this._buttons.find(button => !button.disabled);

      if (button) {
        button.selected = true;
      }
    }
  }

  private _handleSegmentedButtonClick(e: Event) {
    const index = this._buttons.indexOf(e.target as SegmentedButton);
    const clicked = this._buttons[index];

    if (!clicked || clicked.selected || clicked.disabled) return;

    clicked.selected = true;

    this._buttons.forEach(button => {
      if (button !== clicked) {
        button.selected = false;
      }
    });

    this.dispatchEvent(
      new CustomEvent("segmented-button-group-change", {
        detail: {
          selected: clicked,
          index,
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
        class="button-group"
        part="button-group"
        aria-label=${nothing}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
