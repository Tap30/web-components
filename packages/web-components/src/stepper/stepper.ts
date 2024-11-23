import "@tapsioss/icons/dist/icons/minus";
import "@tapsioss/icons/dist/icons/plus";
import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import "../button/icon-button";

export class Stepper extends LitElement {
  @property({ type: String })
  public unit = "";

  @property({ type: Boolean })
  public disabled = false;

  @property({ type: Number })
  public step = 1;

  @property({ type: Number })
  public min = -Infinity;

  @property({ type: Number })
  public max = Infinity;

  @property({ type: String, reflect: true })
  public size: "small" | "medium" = "medium";

  @property({ type: Boolean, reflect: true })
  public fullWidth = false;

  @property({ type: Number, reflect: true })
  public value = 0;

  public override connectedCallback() {
    super.connectedCallback();
    this.addEventListener("keydown", this._handleKeyDown);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowDown":
        this._handleDecrease();
        event.preventDefault();
        event.stopPropagation();
        break;
      case "ArrowUp":
        this._handleIncrease();
        event.preventDefault();
        event.stopPropagation();
        break;
      case "Home":
        this._emitValueChange(this.min);
        event.preventDefault();
        event.stopPropagation();
        break;
      case "End":
        this._emitValueChange(this.max);
        event.preventDefault();
        event.stopPropagation();
        break;
      default:
        break;
    }
  };

  private _emitValueChange = (newValue: number) => {
    this.value = newValue;

    this.dispatchEvent(
      new CustomEvent("stepper-change", {
        detail: {
          value: this.value,
        },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private _handleIncrease = () => {
    if (this.value < this.max) {
      this._emitValueChange(this.value + this.step);
    }
  };

  private _handleDecrease = () => {
    if (this.value > this.min) {
      this._emitValueChange(this.value - this.step);
    }
  };

  protected override render() {
    const iconSize = this.size === "small" ? 20 : 24;

    return html`
      <div
        class="stepper"
        part="stepper"
      >
        <tap-icon-button
          .size=${this.size}
          type="button"
          part="decrease-button"
          variant="ghost"
          tabindex="-1"
          @click=${this._handleDecrease}
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
          @click=${this._handleIncrease}
          ?disabled=${this.disabled || this.value >= this.max}
        >
          <tap-icon-plus
            .width=${iconSize}
            .height=${iconSize}
          ></tap-icon-plus>
        </tap-icon-button>
      </div>
    `;
  }
}
