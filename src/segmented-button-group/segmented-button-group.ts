import { LitElement, html, nothing } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { SegmentedButton } from "../segmented-button/segmented-button.js";

export class SegmentedButtonGroup extends LitElement {
  @property({ reflect: true }) size: "sm" | "md" = "md";

  @queryAssignedElements() private buttons!: SegmentedButton[];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      "segmented-button-click",
      this.handleSegmentedButtonClick
    );
  }

  private handleSlotChange() {
    const selected = this.buttons.find((button) => button.selected);

    if (!selected) {
      const button = this.buttons.find((button) => !button.disabled);

      if (button) {
        button.selected = true;
      }
    }
  }

  private handleSegmentedButtonClick(e: Event) {
    const index = this.buttons.indexOf(e.target as SegmentedButton);
    const clicked = this.buttons[index];

    if (!clicked || clicked.selected || clicked.disabled) return;

    clicked.selected = true;

    this.buttons.forEach((button) => {
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
      })
    );
  }

  render() {
    return html`
      <div
        role="group"
        class="button-group"
        part="button-group"
        aria-label=${nothing}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}
