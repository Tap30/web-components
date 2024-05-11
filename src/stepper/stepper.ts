import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import '../icon-button';
import '../icons/plus';
import '../icons/minus';

export class Stepper extends LitElement {
  @property({ type: String }) unit = '';

  @property({ type: Boolean }) disabled = false;

  @property({ type: Number }) step = 1;

  @property({ type: Number }) min = -Infinity;

  @property({ type: Number }) max = Infinity;

  @property({ type: String, reflect: true }) size: 'small' | 'medium' =
    'medium';

  @property({ type: Boolean, reflect: true }) fullWidth = false;

  @property({ type: Number, reflect: true }) value = 0;

  render() {
    const iconSize = this.size === 'small' ? 20 : 24;

    return html`
      <div class="stepper" part="stepper">
        <tap-icon-button
          .size=${this.size}
          type="button"
          part="decrease-button"
          variant="ghost"
          @click=${this.handleDecrease}
          ?disabled=${this.disabled || this.value <= this.min}
        >
          <tap-icon-minus
            .width=${iconSize}
            .height=${iconSize}
          ></tap-icon-minus>
        </tap-icon-button>
        <p part="value">${this.value}</p>
        ${this.unit ? html`<p part="unit">${this.unit}</p>` : nothing}
        <tap-icon-button
          .size=${this.size}
          type="button"
          part="increase-button"
          variant="ghost"
          @click=${this.handleIncrease}
          ?disabled=${this.disabled || this.value >= this.max}
        >
          <tap-icon-plus .width=${iconSize} .height=${iconSize}></tap-icon-plus>
        </tap-icon-button>
      </div>
    `;
  }

  private handleIncrease = () => {
    if (this.value < this.max) {
      this.value += this.step;
    }
  };

  private handleDecrease = () => {
    if (this.value > this.min) {
      this.value -= this.step;
    }
  };
}
