import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";

export class Chip extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ reflect: true, type: Boolean })
  public selected = false;

  @property({ type: Boolean })
  public disabled = false;

  @property({ reflect: true, type: Boolean })
  public hasIcon = false;

  @property({ reflect: true })
  public size: "sm" | "md" = "md";

  private _handleClick() {
    this.dispatchEvent(
      new Event("chip-click", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override render() {
    const { ariaLabel } = this;

    return html`
      <button
        class="chip"
        ?disabled=${this.disabled}
        tabindex="${this.disabled ? "-1" : "0"}"
        @click="${this._handleClick}"
        aria-label=${ariaLabel || nothing}
        aria-pressed=${this.selected}
      >
        <slot></slot>
        ${this.hasIcon ? html`<slot name="icon"></slot>` : nothing}
      </button>
    `;
  }
}
