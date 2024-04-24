import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";

export class BottomNavigationItem extends LitElement {
  @property({ type: Boolean, reflect: true }) active = false;

  private handleClick() {
    this.dispatchEvent(
      new Event("bottom-navigation-item-click", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html` <button
      tabindex="0"
      class="bottom-navigation-item"
      part="bottom-navigation-item"
      aria-label=${nothing}
      aria-selected=${this.active ? "true" : "false"}
      @click="${this.handleClick}"
    >
      <slot name="icon" ?hidden=${this.active}></slot>
      <slot name="active-icon" ?hidden=${!this.active}></slot>
      <slot></slot>
    </button>`;
  }
}
