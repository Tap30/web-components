import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { getRenderRootSlot, isSSR, logger } from "../utils";
import { Slots } from "./constants";
import { ActiveChangeEvent } from "./events";
import { ActivateEvent, SegmentedViewItem } from "./item";

export class SegmentedView extends LitElement {
  private _activeItem = "";

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
      this._handleItemActivate = this._handleItemActivate.bind(this);
    }
  }

  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      ActivateEvent.type,
      this._handleItemActivate as EventListener,
    );
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(
      ActivateEvent.type,
      this._handleItemActivate as EventListener,
    );
  }

  private get _items() {
    const itemsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!itemsSlot) return [];

    const items = itemsSlot
      .assignedNodes()
      .filter(node => node instanceof SegmentedViewItem);

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

    this._activate(value);
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

  private _handleItemActivate(event: ActivateEvent) {
    const { itemValue } = event.details;

    const eventAllowed = this.dispatchEvent(
      new ActiveChangeEvent({ itemValue }),
    );

    if (!eventAllowed) event.preventDefault();
  }

  private _handleItemsSlotChange() {
    const hasActiveItem = !!this._queryActiveItem;
    const firstItem = this._items[0];

    if (hasActiveItem || !firstItem) return;

    firstItem.active = true;
  }

  protected override render() {
    if (!this.label) {
      logger(
        "Set `label` attribute for better accessibility.",
        "segmented-view",
        "warning",
      );
    }

    return html`
      <div
        role="tablist"
        class="root"
        part="root"
        aria-label=${this.label || nothing}
      >
        <slot @slotchange=${this._handleItemsSlotChange}></slot>
      </div>
    `;
  }
}
