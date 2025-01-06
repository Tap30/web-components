import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { getRenderRootSlot, isSSR, logger } from "../utils";
import { Slots } from "./constants";
import { ActiveChangeEvent } from "./events";
import { ActivateEvent, BottomNavigationItem } from "./item";

export class BottomNavigation extends LitElement {
  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  private get _items() {
    const itemsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!itemsSlot) return [];

    const items = itemsSlot
      .assignedNodes()
      .filter(node => node instanceof BottomNavigationItem);

    return items;
  }

  constructor() {
    super();

    if (!isSSR()) {
      this._handleItemActivation = this._handleItemActivation.bind(this);
    }
  }

  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      ActivateEvent.type,
      this._handleItemActivation as EventListener,
    );
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(
      ActivateEvent.type,
      this._handleItemActivation as EventListener,
    );
  }

  private _handleItemActivation(event: ActivateEvent) {
    const item = event.target as BottomNavigationItem;
    const value = item.value;

    const eventAllowed = this.dispatchEvent(new ActiveChangeEvent({ value }));

    if (!eventAllowed) event.preventDefault();
    else {
      this._items.forEach(item => {
        if (item.value !== value) item.active = false;
      });
    }
  }

  protected override render() {
    if (!this.label) {
      logger(
        "Set `label` attribute for better accessibility.",
        "bottom-navigation",
        "warning",
      );
    }

    return html`
      <nav
        role="navigation"
        class="root"
        part="root"
        aria-label=${this.label || nothing}
      >
        <slot></slot>
      </nav>
    `;
  }
}
