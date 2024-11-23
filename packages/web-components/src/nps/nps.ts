import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../button/icon-button";
import ValueChangeEvent from "./events";
import { getGradientClass } from "./utils";

export class Nps extends LitElement {
  @property({ type: Number })
  public min = 0;

  @property({ type: Number })
  public max = 10;

  @property({ type: Number })
  public value?: number = undefined;

  public override connectedCallback() {
    super.connectedCallback();
    this.addEventListener("keydown", this._handleKeyDown);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        this._handleDecrease();
        event.preventDefault();
        break;
      case "ArrowUp":
        this._handleIncrease();
        event.preventDefault();
        break;
      case "Home":
        this._emitValueChange(this.min);
        event.preventDefault();
        break;
      case "End":
        this._emitValueChange(this.max);
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  private _emitValueChange = (newValue: number) => {
    this.value = newValue;

    this.dispatchEvent(new ValueChangeEvent(this.value));
  };

  private _handleIncrease = () => {
    if (this.value && this.value < this.max) {
      this._emitValueChange(this.value + 1);
    }
  };

  private _handleDecrease = () => {
    if (this.value && this.value > this.min) {
      this._emitValueChange(this.value - 1);
    }
  };

  private _handleSliderInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);

    if (Number.isNaN(value)) return;

    this._emitValueChange(value);
  }

  private _renderGradient = () => {
    const gradientWidth =
      this.value === undefined
        ? 0
        : Math.min(
            ((this.value + 1 - this.min) / (this.max - this.min + 1)) * 100,
            100,
          );

    return html`<div
      part="gradient"
      class=${getGradientClass(this.min, this.max, this.value)}
      style="width: ${gradientWidth}%;"
    ></div>`;
  };

  private _renderDot(isSelected: boolean) {
    return html`<div
      class="${classMap({
        dot: true,
        "dot-selected": isSelected,
      })}"
      part="dot"
    ></div>`;
  }

  private _renderRateLabel(rate: number) {
    return html`<div
      class="label"
      part="label"
    >
      ${rate}
    </div>`;
  }

  private _renderRate(rate: number) {
    const isValueAtLimit =
      this.value === rate && [this.min, this.max].includes(this.value);

    const isRateOutOfBounds = ![this.min, this.max].includes(rate);

    return html`<div
      class="rate-cell"
      part="rate-cell"
    >
      <div
        part="rate"
        class="rate"
        data-rate="${rate}"
      >
        ${isRateOutOfBounds || isValueAtLimit
          ? this._renderDot(rate === this.value)
          : rate}
      </div>
      ${this.value !== undefined && this.value === rate
        ? this._renderRateLabel(rate)
        : nothing}
    </div>`;
  }

  private _renderRates() {
    return Array.from({ length: this.max - this.min + 1 })
      .map((_, i) => i + this.min)
      .map(rate => this._renderRate(rate));
  }

  protected override render() {
    return html`
      <div
        role="slider"
        class="root"
        part="root"
        aria-valuemin=${this.min}
        aria-valuenow=${this.value}
        aria-valuemax=${this.max}
      >
        ${this._renderGradient()} ${this._renderRates()}

        <input
          class="slider"
          part="slider"
          type="range"
          min=${this.min}
          max=${this.max}
          value=${ifDefined(this.value)}
          @input=${(e: Event) => this._handleSliderInput(e)}
        />
      </div>
    `;
  }
}
