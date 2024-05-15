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
          tabindex="-1"
          @click=${this.handleDecrease}
          ?disabled=${this.disabled || this.value <= this.min}
        >
          <tap-icon-minus
            .width=${iconSize}
            .height=${iconSize}
          ></tap-icon-minus>
        </tap-icon-button>
        <dev
          tabindex="0"
          role="spinbutton"
          aria-valuenow=${this.value}
          aria-valuemax=${this.max}
          aria-valuemin=${this.min}
        >
          <span part="value">${this.value}</span>
          ${this.unit ? html`<span part="unit">${this.unit}</span>` : nothing}
        </dev>
        <tap-icon-button
          .size=${this.size}
          type="button"
          part="increase-button"
          variant="ghost"
          tabindex="-1"
          @click=${this.handleIncrease}
          ?disabled=${this.disabled || this.value >= this.max}
        >
          <tap-icon-plus .width=${iconSize} .height=${iconSize}></tap-icon-plus>
        </tap-icon-button>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowDown':
        this.handleDecrease();
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'ArrowUp':
        this.handleIncrease();
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Home':
        this.handleChange(this.min);
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'End':
        this.handleChange(this.max);
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  };

  private handleChange = (newValue: number) => {
    this.value = newValue;
    this.dispatchChangeEvent();
  };

  private dispatchChangeEvent = () => {
    this.dispatchEvent(
      new CustomEvent('stepper-change', {
        detail: {
          value: this.value,
        },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private handleIncrease = () => {
    if (this.value < this.max) {
      this.handleChange(this.value + this.step);
    }
  };

  private handleDecrease = () => {
    if (this.value > this.min) {
      this.handleChange(this.value - this.step);
    }
  };
}
