import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { getRenderRootSlot, isSSR, logger } from "../utils";
import { Slots } from "./constants";
import { ActiveChangeEvent } from "./events";
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
    if (isSSR()) return;

    this._items.forEach(item => {
      if (value === item.value) item.active = true;
      else item.active = false;
    });

    this._activeItem = value;
  }

  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  constructor() {
    super();

    if (!isSSR()) {
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

    this._emitActiveChange(itemValue);
  }

  private _deactivate(itemValue: string) {
    const targetItem = this._items.find(item => item.value === itemValue);

    if (!targetItem || !targetItem.active) return;

    const hasActiveItem = !!this._queryActiveItem;
    const firstItem = this._items[0];

    if (hasActiveItem || !firstItem) return;

    this._emitActiveChange(firstItem.value);
  }

  private _emitActiveChange(activeValue: string) {
    const prevActiveItem = this.activeItem;

    this.activeItem = activeValue;

    const eventAllowed = this.dispatchEvent(
      new ActiveChangeEvent({ activeItem: activeValue }),
    );

    if (!eventAllowed) this.activeItem = prevActiveItem;
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

    this._emitActiveChange(firstItem.value);
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
        <slot @slotchange=${this._handleItemsSlotChange}></slot>
      </nav>
    `;
  }
}
