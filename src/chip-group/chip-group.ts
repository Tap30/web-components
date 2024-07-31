import { LitElement, html } from 'lit';
import { Chip } from '../chip/chip';
import { property, queryAssignedElements } from 'lit/decorators.js';

export class ChipGroup extends LitElement {
  @property({ reflect: true }) size: 'sm' | 'md' = 'md';

  @queryAssignedElements() private buttons!: Chip[];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('chip-click', this.handleChipClick);
  }

  private handleChipClick(e: Event) {
    const index = this.buttons.indexOf(e.target as Chip);
    const clicked = this.buttons[index];

    if (!clicked || clicked.selected || clicked.disabled) return;

    clicked.selected = true;

    this.buttons.forEach((button) => {
      if (button !== clicked) {
        button.selected = false;
      }
    });

    this.dispatchEvent(
      new CustomEvent('chip-group-change', {
        detail: {
          selected: clicked,
          index,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
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
