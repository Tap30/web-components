import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

export class Chip extends LitElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ reflect: true, type: Boolean }) selected = false;

  @property({ type: Boolean }) disabled = false;

  @property({ reflect: true, type: Boolean }) hasIcon = false;

  @property({ reflect: true }) size: 'sm' | 'md' = 'md';

  private handleClick() {
    this.dispatchEvent(
      new Event('chip-click', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const { ariaLabel } = this;

    return html`
      <button
        class="chip"
        ?disabled=${this.disabled}
        tabindex="${this.disabled ? '-1' : '0'}"
        @click="${this.handleClick}"
        aria-label=${ariaLabel || nothing}
        aria-pressed=${this.selected}
      >
        <slot></slot>
        ${this.hasIcon ? html`<slot name="icon"></slot>` : nothing}
      </button>
    `;
  }
}
