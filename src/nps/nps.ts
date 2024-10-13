import "@tapsioss/icons/dist/icons/minus";
import "@tapsioss/icons/dist/icons/plus";
import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "../icon-button";
import { BASENAME, GradientColorClass, Parts } from "./constants";

export class Nps extends LitElement {
  @property({ type: Number })
  public min = 0;

  @property({ type: Number })
  public max = 10;

  @property({ type: Number, reflect: true })
  public value?: number | undefined = undefined;

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
      // TODO: use base class
      new CustomEvent("nps-change", {
        detail: {
          value: this.value,
        },
        bubbles: true,
        composed: true,
      }),
    );
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

  private _handleClick = (value: number) => {
    this._emitValueChange(value);
  };

  private _renderGradient = () => {
    const gradientWidth =
      this.value === undefined
        ? 0
        : Math.min(
            ((this.value + 1 - this.min) / (this.max - this.min + 1)) * 100,
            100,
          );

    const getGradientColor = () => {
      if (this.value === undefined) return "transparent";

      const rangeLength = this.max - this.min;

      if (this.value < rangeLength / 2) return GradientColorClass.RED;

      if (this.value < rangeLength * 0.65) return GradientColorClass.YELLOW;

      if (this.value < rangeLength * 0.85) return GradientColorClass.GRAY;

      return GradientColorClass.GREEN;
    };

    return html`<div
      class=${classMap({
        [`${BASENAME}__gradient`]: true,
        [`${BASENAME}__rounded_end`]: this.value === this.max,
        [getGradientColor()]: true,
      })}
      style="width: ${gradientWidth}%;"
    ></div>`;
  };

  private _renderDot() {
    return html`<div
      class="${BASENAME}__dot"
      part="${Parts.DOT}"
    ></div>`;
  }

  private _renderRateLabel(rate: number) {
    return html`<div
      class="${BASENAME}__label"
      part="${Parts.LABEL}"
    >
      ${rate}
    </div>`;
  }

  private _renderRate(rate: number) {
    const isValueAtLimit =
      this.value === rate && [this.min, this.max].includes(this.value);

    const isRateOutOfBounds = ![this.min, this.max].includes(rate);

    return html`<div class="${BASENAME}__rate_wrapper">
      <button
        part="${Parts.RATE}"
        class="${BASENAME}__rate"
        @click=${() => this._handleClick(rate)}
      >
        ${isRateOutOfBounds || isValueAtLimit ? this._renderDot() : rate}
      </button>
      ${this.value !== undefined && this.value === rate
        ? this._renderRateLabel(rate)
        : nothing}
    </div>`;
  }

  protected override render() {
    return html`
      <div
        role="slider"
        class="${BASENAME}__container"
        part="${Parts.CONTAINER}"
        aria-valuemin=${this.min}
        aria-valuenow=${this.value}
        aria-valuemax=${this.min}
      >
        ${this._renderGradient()}
        ${Array(this.max - this.min + 1)
          .fill(0)
          .map((_, i) => i + this.min)
          .map(rate => this._renderRate(rate))}

        <input
          class="${BASENAME}__slider"
          type="range"
          min=${this.min}
          max=${this.max}
          value=${this.value}
          @input=${(e: Event) =>
            this._handleClick(parseInt((e.target as HTMLInputElement).value))}
        />
      </div>
    `;
  }
}
