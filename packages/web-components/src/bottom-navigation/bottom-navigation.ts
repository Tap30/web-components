import { LitElement, html } from "lit";
import { queryAssignedElements } from "lit/decorators.js";
import { type BottomNavigationItem } from "../bottom-navigation-item/bottom-navigation-item";

export class BottomNavigation extends LitElement {
  @queryAssignedElements()
  private _items!: BottomNavigationItem[];

  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      "bottom-navigation-item-click",
      this._handleBottomNavigationItemClick,
    );
  }

  private get _firstItem() {
    return this._items[0];
  }

  private _handleBottomNavigationItemClick(e: Event) {
    const clicked = this._items.find(item => item === e.target);

    if (!clicked || clicked.active) return;

    clicked.active = true;

    this._items.forEach(item => {
      if (item !== clicked) {
        item.active = false;
      }
    });
  }

  private _handleSlotChange() {
    const active = this._items.find(item => item.active);

    if (!active && this._firstItem) {
      this._firstItem.active = true;
    }
  }

  protected override render() {
    return html`
      <nav
        role="navigation"
        class="bottom-navigation"
        part="bottom-navigation"
        aria-label="bottom-navigation"
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </nav>
    `;
  }
}
