import "../button/icon-button/index.ts";

import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { requestFormSubmit } from "../base-input/utils.ts";
import { KeyboardKeys } from "../internals/index.ts";
import {
  clamp,
  dispatchActivationClick,
  getFormValue,
  isActivationClick,
  isSsr,
  logger,
  runAfterRepaint,
  toFaNumber,
  waitAMicrotask,
  withElementInternals,
  withFormAssociated,
} from "../utils/index.ts";
import { DEFAULT_MAX, DEFAULT_MIN } from "./constants.ts";
import { minus, plus } from "./icons.ts";
import styles from "./stepper.style.ts";

const BaseClass = withFormAssociated(withElementInternals(LitElement));

/**
 * @summary A simple input component that allows users to increment or decrement a numeric value using the provided buttons.
 *
 * @tag tapsi-stepper
 *
 * @fires {Event} change - Fires when value changes (bubbles).
 */
export class Stepper extends BaseClass {
  /** @internal */
  public static override readonly styles = [styles];

  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _value = "";

  /**
   * The unit of the value.
   *
   * @prop {string} unit
   * @attr {string} unit
   * @default ""
   */
  @property()
  public unit = "";

  /**
   * The size of the input.
   *
   * @prop {"sm" | "md"} size
   * @attr {"sm" | "md"} size
   * @default "md"
   */
  @property()
  public size: "sm" | "md" = "md";

  /**
   * The current value of the input.
   *
   * @prop {string} value
   * @default "0"
   */
  @property()
  public get value() {
    return this._value || this.min || `${DEFAULT_MIN}`;
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
   *
   * @prop {string} valueText
   * @attr {string} valuetext
   * @default ""
   */
  @property()
  public valueText = "";

  /**
   * Defines a string value that can be used to name input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   *
   * @prop {string} label
   * @attr {string} label
   * @default ""
   */
  @property()
  public label = "";

  /**
   * Identifies the element (or elements) that labels the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   *
   * @prop {string} labelledBy
   * @attr {string} labelledby
   * @default ""
   */
  @property()
  public labelledBy = "";

  /**
   * Indicates whether a user should be able to edit the input's value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
   *
   * @prop {boolean} readOnly
   * @attr {string} readonly
   * @default ""
   */
  @property({ type: Boolean, reflect: true })
  public readOnly = false;

  /**
   * Defines the maximum value in the range of permitted values.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
   *
   * @prop {string} max
   * @attr {string} max
   * @default "100"
   */
  @property()
  public max = `${DEFAULT_MAX}`;

  /**
   * Defines the minimum value in the range of permitted values.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
   *
   * @prop {string} min
   * @attr {string} min
   * @default "0"
   */
  @property()
  public min = `${DEFAULT_MIN}`;

  /**
   * Returns or sets the element's step attribute, which works with min and max
   * to limit the increments/decrements at which the input value can be set.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
   *
   * @prop {string} step
   * @attr {string} step
   * @default "1"
   */
  @property()
  public step = "1";

  /**
   * Indicates that the element should be focused on page load.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
   *
   * @prop {boolean} autofocus
   * @attr {string} autofocus
   * @default ""
   */
  @property({ type: Boolean })
  public override autofocus = false;

  constructor() {
    super();

    this._handleKeyDown = this._handleKeyDown.bind(this);

    if (!isSsr()) {
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

  /** @internal */
  public override connectedCallback(): void {
    super.connectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.addEventListener("keydown", this._handleKeyDown);
  }

  /** @internal */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  protected override firstUpdated(changed: PropertyValues<this>): void {
    super.firstUpdated(changed);

    runAfterRepaint(() => {
      if (!this.autofocus) return;

      this.focus();
    });
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("size")) {
      if (this.size === "md") this.style.width = "100%";
      else this.style.width = "";
    }
  }

  /**
   * The input's value as a number.
   *
   * @prop {number} valueAsNumber
   * @default 0
   */
  public get valueAsNumber() {
    return Number(this.value);
  }

  public set valueAsNumber(value: number) {
    const newValue = clamp(value, Number(this.min), Number(this.max));

    this.value = String(newValue);
  }

  /**
   * Decrements the value of the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
   *
   * @param stepDecrement The number of steps to decrement.
   */
  public stepDown(stepDecrement?: number) {
    this._handleDecrease(stepDecrement);
  }

  /**
   * Increments the value of the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
   *
   * @param stepIncrement The number of steps to increment.
   */
  public stepUp(stepIncrement?: number) {
    this._handleIncrease(stepIncrement);
  }

  /** @internal */
  public override focus(options?: FocusOptions) {
    this.renderRoot?.querySelector<HTMLElement>("#input")?.focus(options);
  }

  /** @internal */
  public override blur() {
    this.renderRoot?.querySelector<HTMLElement>("#input")?.blur();
  }

  /** @internal */
  public override formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  /** @internal */
  public override [getFormValue]() {
    return this.value;
  }

  /** @internal */
  public override formResetCallback() {
    this.value = this.getAttribute("value") ?? "";
    this.valueText = this.getAttribute("valuetext") ?? "";
  }

  /** @internal */
  public override formStateRestoreCallback(state: string) {
    this.value = state;
  }

  private async _handleKeyDown(event: KeyboardEvent) {
    if (this.disabled || this.readOnly) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    switch (event.key) {
      case KeyboardKeys.ENTER: {
        event.preventDefault();

        return requestFormSubmit(this);
      }

      case KeyboardKeys.UP: {
        event.preventDefault();

        return this._handleIncrease();
      }

      case KeyboardKeys.DOWN: {
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

  private _handleIncrease(stepIncrement: number = Number(this.step)) {
    const newValue = clamp(
      this.valueAsNumber + stepIncrement,
      Number(this.min),
      Number(this.max),
    );

    this._emitValueChange(newValue);
  }

  private _handleDecrease(stepDecrement: number = Number(this.step)) {
    const newValue = clamp(
      this.valueAsNumber - stepDecrement,
      Number(this.min),
      Number(this.max),
    );

    this._emitValueChange(newValue);
  }

  private _emitValueChange(newValue: number) {
    if (this.disabled || this.readOnly) return;

    this.valueAsNumber = newValue;

    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  private _renderUnit() {
    if (!this.unit) return null;
    if (this.size === "sm") return null;

    return html`
      <span
        part="unit"
        class="unit"
      >
        ${this.unit}
      </span>
    `;
  }

  protected override render() {
    const hasValidLabel = Boolean(this.label || this.labelledBy);

    if (!hasValidLabel) {
      logger(
        "Expected a valid `label` or `labelledby` attribute, received none.",
        "stepper",
        "error",
      );
    }

    if (!this.valueText) {
      logger(
        "Set `valuetext` attribute for better accessibility.",
        "stepper",
        "warning",
      );
    }

    const ariaLabelledBy = this.label ? nothing : this.labelledBy || nothing;

    const isDecreaseDisabled =
      this.disabled || this.readOnly || this.valueAsNumber <= Number(this.min);

    const isIncreaseDisabled =
      this.disabled || this.readOnly || this.valueAsNumber >= Number(this.max);

    const rootClasses = classMap({
      root: true,
      [this.size]: true,
      disabled: this.disabled,
      readonly: this.readOnly,
    });

    const valueDisplay = toFaNumber(this.value);

    return html`
      <div
        class=${rootClasses}
        part="root"
      >
        <tapsi-icon-button
          size=${this.size}
          type="button"
          part="decrease"
          class="decrease"
          variant="ghost"
          tabindex="-1"
          label="Decrease value"
          aria-hidden="true"
          @click=${() => this._handleDecrease()}
          @focus=${() => this.focus()}
          ?disabled=${isDecreaseDisabled}
        >
          ${minus}
        </tapsi-icon-button>
        <div
          class="input"
          id="input"
          part="input"
          role="spinbutton"
          tabindex=${this.disabled ? "-1" : "0"}
          aria-disabled=${this.disabled}
          aria-readonly=${this.readOnly}
          aria-label=${this.label || nothing}
          aria-labelledby=${ariaLabelledBy}
          aria-valuemax=${this.max}
          aria-valuenow=${this.value}
          aria-valuemin=${this.min}
          aria-valuetext=${this.valueText || nothing}
        >
          <span
            class="value"
            part="value"
          >
            ${valueDisplay}${this._renderUnit()}
          </span>
        </div>
        <div
          class="focus-ring"
          aria-hidden="true"
        ></div>
        <tapsi-icon-button
          size=${this.size}
          type="button"
          part="increase"
          class="increase"
          variant="ghost"
          tabindex="-1"
          label="Increase value"
          aria-hidden="true"
          @click=${() => this._handleIncrease()}
          @focus=${() => this.focus()}
          ?disabled=${isIncreaseDisabled}
        >
          ${plus}
        </tapsi-icon-button>
      </div>
    `;
  }
}
