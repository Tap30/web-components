import { LitElement, html } from "lit";
import { BottomNavigationItem } from "../bottom-navigation-item/bottom-navigation-item";
import { queryAssignedElements } from "lit/decorators.js";

export class BottomNavigation extends LitElement {
  @queryAssignedElements() private items!: BottomNavigationItem[];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      "bottom-navigation-item-click",
      this.handleBottomNavigationItemClick
    );
  }

  private get firstItem() {
    return this.items[0];
  }

  private handleBottomNavigationItemClick(e: Event) {
    const clicked = this.items.find((item) => item === e.target);

    if (!clicked || clicked.active) return;

    clicked.active = true;

    this.items.forEach((item) => {
      if (item !== clicked) {
        item.active = false;
      }
    });
  }

  private handleSlotChange() {
    const active = this.items.find((item) => item.active);

    if (!active && this.firstItem) {
      this.firstItem.active = true;
    }
  }

  render() {
    return html`
      <nav
        role="navigation"
        class="bottom-navigation"
        part="bottom-navigation"
        aria-label="bottom-navigation"
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>
    `;
  }
}
