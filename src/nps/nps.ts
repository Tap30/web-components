import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "../icon-button";
import { Classes, GradientColorClasses, Parts } from "./constants";
import NpsChangeEvent from "./events";

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

    this.dispatchEvent(new NpsChangeEvent(this.value));
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

      if (this.value < rangeLength / 2) return GradientColorClasses.RED;

      if (this.value < rangeLength * 0.65) return GradientColorClasses.YELLOW;

      if (this.value < rangeLength * 0.85) return GradientColorClasses.GRAY;

      return GradientColorClasses.GREEN;
    };

    return html`<div
      part=${Parts.GRADIENT}
      class=${classMap({
        [Parts.GRADIENT]: true,
        [Classes.GRADIENT_ROUNDED]: this.value === this.max,
        [getGradientColor()]: true,
      })}
      style="width: ${gradientWidth}%;"
    ></div>`;
  };

  private _renderDot(isSelected: boolean) {
    return html`<div
      class="${classMap({
        [Parts.DOT]: true,
        [Classes.DOT_SELECTED]: isSelected,
      })}"
      part="${Parts.DOT}"
    ></div>`;
  }

  private _renderRateLabel(rate: number) {
    return html`<div
      class="${Parts.LABEL}"
      part="${Parts.LABEL}"
    >
      ${rate}
    </div>`;
  }

  private _renderRate(rate: number) {
    const isValueAtLimit =
      this.value === rate && [this.min, this.max].includes(this.value);

    const isRateOutOfBounds = ![this.min, this.max].includes(rate);

    return html`<div
      class="${Parts.RATE_WRAPPER}"
      part="${Parts.RATE_WRAPPER}"
    >
      <button
        part="${Parts.RATE}"
        class="${Parts.RATE}"
        @click=${() => this._handleClick(rate)}
      >
        ${isRateOutOfBounds || isValueAtLimit
          ? this._renderDot(rate === this.value)
          : rate}
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
        class="${Parts.CONTAINER}"
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
          class="${Parts.SLIDER}"
          part="${Parts.SLIDER}"
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
