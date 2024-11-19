import { LitElement, html, isServer } from "lit";
import { property } from "lit/decorators.js";
import { getRenderRootSlot } from "../utils";
import { Slots } from "./constants";
import { ActivateEvent, BottomNavigationItem, DeactivateEvent } from "./item";

export class BottomNavigation extends LitElement {
  private _activeItem = "";

  private get _items() {
    const itemsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!itemsSlot) return [];

    const items = itemsSlot
      .assignedNodes()
      .filter(node => node instanceof BottomNavigationItem);

    return items;
  }

  private get _queryActiveItem() {
    return this._items.find(item => item.active) ?? null;
  }

  /**
   * The value of the currently activated item.
   */
  @property({ type: String, attribute: false })
  public get activeItem() {
    return this._activeItem;
  }

  public set activeItem(value: string) {
    if (isServer) return;

    this._activate(value);
  }

  /**
   * The label used for screen readers.
   */
  @property({ type: String, attribute: "screen-reader-label" })
  public screenReaderLabel = "Bottombar navigation";

  constructor() {
    super();

    if (!isServer) {
      this._handleItemActivation = this._handleItemActivation.bind(this);
      this._handleItemDeactivation = this._handleItemDeactivation.bind(this);
    }
  }

  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      ActivateEvent.type,
      this._handleItemActivation as EventListener,
    );

    this.addEventListener(
      DeactivateEvent.type,
      this._handleItemDeactivation as EventListener,
    );
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(
      ActivateEvent.type,
      this._handleItemActivation as EventListener,
    );

    this.removeEventListener(
      DeactivateEvent.type,
      this._handleItemDeactivation as EventListener,
    );
  }

  private _activate(itemValue: string) {
    const targetItem = this._items.find(item => {
      return item.value === itemValue;
    });

    if (!targetItem || targetItem.active) return;

    this._items.forEach(item => {
      if (item !== targetItem) item.active = false;
    });

    this._activeItem = itemValue;
    targetItem.active = true;
  }

  private _deactivate(itemValue: string) {
    const targetItem = this._items.find(item => item.value === itemValue);

    if (!targetItem || !targetItem.active) return;

    targetItem.active = false;
    this._activeItem = "";

    const hasActiveItem = !!this._queryActiveItem;
    const firstItem = this._items[0];

    if (hasActiveItem || !firstItem) return;

    firstItem.active = true;
    this._activeItem = firstItem.value;
  }

  private _handleItemDeactivation(event: DeactivateEvent) {
    const { itemValue } = event.details;

    this._deactivate(itemValue);
  }

  private _handleItemActivation(event: ActivateEvent) {
    const { itemValue } = event.details;

    this._activate(itemValue);
  }

  private _handleItemsSlotChange() {
    const hasActiveItem = !!this._queryActiveItem;
    const firstItem = this._items[0];

    if (hasActiveItem || !firstItem) return;

    firstItem.active = true;
  }

  protected override render() {
    return html`
      <nav
        role="navigation"
        class="root"
        part="root"
        aria-label=${this.screenReaderLabel}
      >
        <slot @slotchange=${this._handleItemsSlotChange}></slot>
      </nav>
    `;
  }
}
