import { html, LitElement, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { logger } from "../../utils";
import { SynchronizeRequestEvent } from "../events";
import ItemSelectionController from "./Controller";

export class PinwheelItem extends LitElement {
  private _selected = false;

  /**
   * Indicates whether the item is selected or not.
   */
  @property({ type: Boolean, reflect: true })
  public get selected() {
    return this._selected;
  }

  public set selected(isSelected: boolean) {
    const prevSelected = this.selected;

    if (prevSelected === isSelected) return;

    this._selected = isSelected;
    this.requestUpdate("selected", prevSelected);
    this._selectionController.handleSelectionChange();
  }

  /**
   * The value associated with the item.
   * This value has to be unique among sibling items.
   */
  @property()
  public value = "";

  private readonly _selectionController = new ItemSelectionController(this);

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("selected") && this.hasUpdated) {
      this.dispatchEvent(new SynchronizeRequestEvent());
    }
  }

  protected override render() {
    if (!this.value) {
      logger(
        `Expected a valid \`value\` property/attribute. Received \`${this.value}\`.`,
        "pinwheel-item",
        "error",
      );
    }

    const rootClasses = classMap({
      root: true,
      selected: this.selected,
    });

    return html`
      <div
        id="root"
        aria-hidden="true"
        class=${rootClasses}
        part="root"
        data-value=${this.value}
        @click=${this._selectionController.handleClick}
        @keydown=${this._selectionController.handleKeyDown}
      >
        <slot></slot>
      </div>
    `;
  }
}
