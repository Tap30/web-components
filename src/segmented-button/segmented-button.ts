import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

export class SegmentedButton extends LitElement {
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean }) disabled = false;

  private handleClick() {
    this.dispatchEvent(
      new Event('segmented-button-click', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <button
        class="button"
        part="button"
        aria-label=${nothing}
        aria-pressed=${this.selected}
        tabindex="${this.disabled ? '-1' : '0'}"
        ?disabled=${this.disabled}
        @click="${this.handleClick}"
      >
        <slot></slot>
      </button>
    `;
  }
}
