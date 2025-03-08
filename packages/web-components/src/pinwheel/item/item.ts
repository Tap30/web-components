import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { logger } from "../../utils/index.ts";
import ItemSelectionController from "./Controller.ts";

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
      >
        <slot></slot>
      </div>
    `;
  }
}
