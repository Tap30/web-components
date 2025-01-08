import { html, LitElement, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";
import { styleMap } from "lit/directives/style-map.js";
import { requestFormSubmit } from "../base-input/utils";
import { KeyboardKeys } from "../internals";
import {
  clamp,
  dispatchActivationClick,
  getBoundingClientRect,
  getFormValue,
  isActivationClick,
  isSSR,
  logger,
  toFaNumber,
  waitAMicrotask,
  withElementInternals,
  withFormAssociated,
} from "../utils";
import { DEFAULT_MAX, DEFAULT_MIN } from "./constants";

const BaseClass = withFormAssociated(withElementInternals(LitElement));

export class RateSlider extends BaseClass {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _value = "";

  /**
   * The current value of the input. It is always a string.
   */
  @property()
  public get value() {
    return this._value;
  }

  public set value(newValue: string) {
    if (this._value === newValue) return;

    if (newValue === "" || Number.isNaN(Number(newValue))) {
      this._value = "";

      return;
    }

    const min = Number(this.min) || DEFAULT_MIN;
    const max = Number(this.max) || DEFAULT_MAX;

    this._value = String(clamp(Number(newValue), min, max));
  }

  /**
   * Defines the human-readable text alternative of value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuetext
   */
  @property({ type: String })
  public valueText = "";

  /**
   * Defines a string value that can be used to name input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  /**
   * Identifies the element (or elements) that labels the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   */
  @property({ type: String })
  public labelledBy = "";

  /**
   * Defines the maximum value in the range of permitted values.
   * Defaults to "10".
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
   */
  @property({ type: String })
  public max = `${DEFAULT_MAX}`;

  /**
   * Defines the minimum value in the range of permitted values.
   * Defaults to "0".
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
   */
  @property({ type: String })
  public min = `${DEFAULT_MIN}`;

  @query("#root")
  private _root!: HTMLElement | null;

  @state()
  private _isDragStarted = false;

  constructor() {
    super();

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleDragStart = this._handleDragStart.bind(this);
    this._handleDragEnd = this._handleDragEnd.bind(this);
    this._handleDragging = this._handleDragging.bind(this);

    if (!isSSR()) {
      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
      this.addEventListener("click", async event => {
        if (this.disabled) return;

        // allow event to propagate to user code after a microtask.
        await waitAMicrotask();

        if (event.defaultPrevented) return;
        if (!isActivationClick(event)) return;

        this.focus();

        dispatchActivationClick(this);
      });
    }
  }

  public override connectedCallback() {
    super.connectedCallback();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.addEventListener("keydown", this._handleKeyDown);

    this.addEventListener("mousedown", this._handleDragStart);
    this.addEventListener("touchstart", this._handleDragStart);

    document.addEventListener("mousemove", this._handleDragging);
    document.addEventListener("touchmove", this._handleDragging);

    document.addEventListener("mouseup", this._handleDragEnd);
    document.addEventListener("touchend", this._handleDragEnd);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.removeEventListener("keydown", this._handleKeyDown);

    this.removeEventListener("mousedown", this._handleDragStart);
    this.removeEventListener("touchstart", this._handleDragStart);

    document.removeEventListener("mousemove", this._handleDragging);
    document.removeEventListener("touchmove", this._handleDragging);

    document.removeEventListener("mouseup", this._handleDragEnd);
    document.removeEventListener("touchend", this._handleDragEnd);
  }

  private get _selectedStopIdx() {
    if (!this.value) return -1;

    const stops = Array.from(this._stopsIterator);

    if (stops.length === 0) return -1;

    return stops.findIndex(stop => stop === this.valueAsNumber);
  }

  /**
   * The input's value as a number.
   */
  public get valueAsNumber() {
    if (this.value === "") return NaN;

    return Number(this.value);
  }

  public set valueAsNumber(value: number) {
    if (this.disabled) return;

    if (Number.isNaN(value)) {
      this.value = "";

      return;
    }

    const newValue = clamp(value, Number(this.min), Number(this.max));

    this.value = String(newValue);
  }

  /**
   * Decrements the value of the input.
   */
  public stepDown() {
    this._handleDecrease();
  }

  /**
   * Increments the value of the input.
   */
  public stepUp() {
    this._handleIncrease();
  }

  public override focus(options?: FocusOptions) {
    this._root?.focus(options);
  }

  public override blur() {
    this._root?.blur();
  }

  public override formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  public override [getFormValue]() {
    return this.value;
  }

  public override formResetCallback() {
    this.value = this.getAttribute("value") ?? "";
    this.valueText = this.getAttribute("valuetext") ?? "";
  }

  public override formStateRestoreCallback(state: string) {
    this.value = state;
  }

  private get _stopsIterator() {
    const min = Number(this.min) || DEFAULT_MIN;
    const max = Number(this.max) || DEFAULT_MAX;

    return range(min, max + 1);
  }

  private _handleIncrease() {
    const value = Number.isNaN(this.valueAsNumber) ? -1 : this.valueAsNumber;
    const newValue = clamp(value + 1, Number(this.min), Number(this.max));

    this._emitValueChange(newValue);
  }

  private _handleDecrease() {
    const value = Number.isNaN(this.valueAsNumber) ? -1 : this.valueAsNumber;
    const newValue = clamp(value - 1, Number(this.min), Number(this.max));

    this._emitValueChange(newValue);
  }

  private async _handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    switch (event.key) {
      case KeyboardKeys.ENTER: {
        event.preventDefault();

        return requestFormSubmit(this);
      }

      case KeyboardKeys.UP:
      case KeyboardKeys.RIGHT: {
        event.preventDefault();

        return this._handleIncrease();
      }

      case KeyboardKeys.DOWN:
      case KeyboardKeys.LEFT: {
        event.preventDefault();

        return this._handleDecrease();
      }

      case KeyboardKeys.HOME: {
        event.preventDefault();

        return this._emitValueChange(Number(this.min));
      }

      case KeyboardKeys.END: {
        event.preventDefault();

        return this._emitValueChange(Number(this.max));
      }

      default:
        return;
    }
  }

  private _getClientX(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) return event.clientX;
    if (event instanceof TouchEvent) return event.touches[0]?.clientX ?? 0;

    return 0;
  }

  private _handleDragStart() {
    if (this.disabled) return;

    this._isDragStarted = true;
  }

  private _handleDragEnd() {
    if (this.disabled) return;
    if (!this._isDragStarted) return;

    this._isDragStarted = false;
  }

  private _handleDragging(event: MouseEvent | TouchEvent) {
    if (this.disabled) return;
    if (!this._isDragStarted) return;
    if (!this._root) return;

    if (event.cancelable) {
      event.preventDefault();
      event.stopPropagation();
    }

    const clientX = this._getClientX(event);
    const { left, width } = getBoundingClientRect(this._root);

    const dx = clamp(clientX - left, 0, width);
    const value = this._findClosestValue(dx);

    this._emitValueChange(value);
  }

  private _findClosestValue(dx: number) {
    const stops = Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>(".stop"),
    );

    let reached = 0;
    let targetStop: HTMLElement | null = null;

    for (const stop of stops) {
      reached += stop.offsetWidth;

      if (reached >= dx) {
        targetStop = stop;

        break;
      }
    }

    const attr = targetStop?.getAttribute("data-stop");

    if (!attr) return NaN;

    return Number(attr);
  }

  private _handleStopClick(event: MouseEvent) {
    if (this.disabled) return;

    const target = event.currentTarget as HTMLElement;
    const attr = target.getAttribute("data-stop");

    if (!attr) return;

    this._emitValueChange(Number(attr));
  }

  private _emitValueChange(newValue: number) {
    if (this.disabled) return;
    if (newValue === Number(this.value || "-1")) return;

    this.valueAsNumber = newValue;

    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  private _renderGradient() {
    const value = this.valueAsNumber;
    const min = Number(this.min) || DEFAULT_MIN;
    const max = Number(this.max) || DEFAULT_MAX;

    const classes: Record<string, boolean> = {
      gradient: true,
    };

    const rangeLength = max - min + 1;

    const selectedStopIdx = this._selectedStopIdx;
    const stopCount = selectedStopIdx === -1 ? 0 : selectedStopIdx + 1;

    if (selectedStopIdx < Math.floor(rangeLength / 2)) classes.red = true;
    else if (selectedStopIdx < Math.floor(rangeLength * 0.65)) {
      classes.yellow = true;
    } else if (selectedStopIdx < Math.floor(rangeLength * 0.85)) {
      classes.gray = true;
    } else classes.green = true;

    if (value === max) classes.rounded = true;

    const stopCssWidthVar = "--rate-slider-stop-width";
    const stopCssWidth = `calc((${100}% - 1rem) / ${rangeLength})`;
    const cssOffset = value === max ? "1rem" : "0.5rem";

    const gradientWidth =
      stopCount === 0
        ? "0"
        : `calc((${stopCount} * var(${stopCssWidthVar})) + ${cssOffset})`;

    const styles = styleMap({
      [stopCssWidthVar]: stopCssWidth,
      width: gradientWidth,
    });

    return html`
      <div
        aria-hidden="true"
        class=${classMap(classes)}
        part="gradient"
        style=${styles}
      ></div>
    `;
  }

  private _renderStop(value: number) {
    const valueDisplay = toFaNumber(String(value));
    const selected = this.valueAsNumber === value;

    const classes = classMap({
      stop: true,
      selected,
    });

    return html`
      <div
        class=${classes}
        part="stop"
        data-stop=${value}
        @click=${this._handleStopClick}
      >
        <span
          class="value-display"
          part="value-display"
        >
          ${valueDisplay}
        </span>
        <div
          class="value-tooltip"
          part="value-tooltip"
        >
          ${valueDisplay}
        </div>
      </div>
    `;
  }

  private _renderStops() {
    const stops = map(this._stopsIterator, this._renderStop.bind(this));

    return html`
      <div
        class="stops"
        part="stops"
        aria-hidden="true"
      >
        ${stops}
      </div>
    `;
  }

  protected override render() {
    const hasValidLabel = Boolean(this.label || this.labelledBy);

    if (!hasValidLabel) {
      logger(
        "Expected a valid `label` or `labelledby` attribute, received none.",
        "rate-slider",
        "error",
      );
    }

    if (!this.valueText) {
      logger(
        "Set `valuetext` attribute for better accessibility.",
        "rate-slider",
        "warning",
      );
    }

    const ariaLabelledBy = this.label ? nothing : this.labelledBy || nothing;

    const rootClasses = classMap({
      root: true,
      unselected: !this.value,
      disabled: this.disabled,
    });

    return html`
      <div
        class=${rootClasses}
        id="root"
        part="root"
        role="slider"
        tabindex=${this.disabled ? "-1" : "0"}
        aria-disabled=${this.disabled}
        aria-label=${this.label || nothing}
        aria-labelledby=${ariaLabelledBy}
        aria-valuetext=${this.valueText || nothing}
        aria-valuemax=${this.max}
        aria-valuemin=${this.min}
        aria-valuenow=${this.value}
      >
        <div
          aria-hidden="true"
          class="focus-ring"
        ></div>
        ${this._renderGradient()}${this._renderStops()}
      </div>
    `;
  }
}
