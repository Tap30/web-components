import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { SystemError } from "../../utils";

export class PinwheelItem extends LitElement {
  /**
   * Indicates whether the item is selected or not.
   */
  @property({ type: Boolean })
  public selected = false;

  /**
   * The value associated with the item.
   * This value has to be unique among sibling items.
   */
  @property()
  public value = "";

  protected override render() {
    if (!this.value) {
      throw new SystemError(
        `Expected a valid \`value\` property/attribute. Received \`${this.value}\`.`,
        "pinwheel-item",
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
      >
        <slot></slot>
      </div>
    `;
  }
}
