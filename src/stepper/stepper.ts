import {LitElement, html} from "lit";
import {property} from "lit/decorators.js";
import "../button";
import "../icons/plus"
import "../icons/minus"

export class Stepper extends LitElement {
  @property({type: String}) unit = '';

  @property({type: Boolean}) disabled = false;

  @property({type: Number}) step = 1;

  @property({type: Number}) min = -Infinity;

  @property({type: Number}) max = Infinity;

  @property({type: String, reflect: true}) size: "small" | "medium" = "medium";

  @property({type: Number, reflect: true}) value = 0;

  private handleIncrease() {
    if (this.value < this.max) {
      this.value += this.step;
    }
  }

  private handleDecrease() {
    if (this.value > this.min) {
      this.value -= this.step;
    }
  }

  render() {
    const isSmall = this.size === 'small';
    const text = `${this.value}${isSmall ? '' : ` ${this.unit}`}`;
    const iconSize = isSmall ? 20 : 24;

    return html`
      <div class="stepper">
        <tap-button
          .size=${this.size}
          shape="circle"
          type="button"
          variant="ghost"
          @click=${this.handleDecrease}
          ?disabled=${this.disabled || this.value <= this.min}
        >
          <tap-icon-minus .width=${iconSize} .height=${iconSize}></tap-icon-minus>
        </tap-button>

        <p>${text}</p>
        <tap-button
          .size=${this.size}
          shape="circle"
          type="button"
          variant="ghost"
          @click=${this.handleIncrease}
          ?disabled=${this.disabled || this.value >= this.max}
        >
          <tap-icon-plus .width=${iconSize} .height=${iconSize}></tap-icon-plus>
        </tap-button>
      </div>
    `;
  }
}
