import "../button/icon-button";

import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { requestFormSubmit } from "../base-input/utils";
import { KeyboardKeys } from "../internals";
import {
  clamp,
  dispatchActivationClick,
  getFormValue,
  isActivationClick,
  isSSR,
  logger,
  toFaNumber,
  waitAMicrotask,
  withElementInternals,
  withFormAssociated,
} from "../utils";
import { minus, plus } from "./icons";

const BaseClass = withFormAssociated(withElementInternals(LitElement));

export class Stepper extends BaseClass {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _value = "";

  /**
   * The unit of the value.
   */
  @property({ type: String })
  public unit = "";

  /**
   * The size of the input.
   */
  @property({ type: String })
  public size: "sm" | "md" = "md";

  /**
   * The current value of the input. It is always a string.
   */
  @property()
  public get value() {
    return this._value || this.min || "0";
  }

  public set value(newValue: string) {
    if (this._value === newValue) return;

    const min = Number(this.min) || 0;
    const max = Number(this.max) || 100;

    this._value = String(clamp(Number(newValue) || min, min, max));
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
   * Indicates whether or not a user should be able to edit the input's
   * value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
   */
  @property({ type: Boolean, reflect: true })
  public readOnly = false;

  /**
   * Defines the maximum value in the range of permitted values.
   * Defaults to "100".
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
   */
  @property({ type: String })
  public max = "100";

  /**
   * Defines the minimum value in the range of permitted values.
   * Defaults to "0".
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
   */
  @property({ type: String })
  public min = "0";

  /**
   * Returns or sets the element's step attribute, which works with min and max
   * to limit the increments/decrements at which the input value can be set.
   * Defaults to "1".
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
   */
  @property({ type: String })
  public step = "1";

  constructor() {
    super();

    this._handleKeyDown = this._handleKeyDown.bind(this);

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

  public override connectedCallback(): void {
    super.connectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.addEventListener("keydown", this._handleKeyDown);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.removeEventListener("keydown", this._handleKeyDown);
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
   * @param stepDecrement The number of steps to decrement, defaults to 1.
   */
  public stepDown(stepDecrement?: number) {
    this._handleDecrease(stepDecrement);
  }

  /**
   * Increments the value of the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
   *
   * @param stepIncrement The number of steps to increment, defaults to 1.
   */
  public stepUp(stepIncrement?: number) {
    this._handleIncrease(stepIncrement);
  }

  public override focus(options?: FocusOptions) {
    this.renderRoot?.querySelector<HTMLElement>("#input")?.focus(options);
  }

  public override blur() {
    this.renderRoot?.querySelector<HTMLElement>("#input")?.blur();
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

    const prevValue = this.value;

    this.valueAsNumber = newValue;

    const eventAllowed = this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        cancelable: true,
      }),
    );

    // Revert the chagne since the event is prevented.
    if (!eventAllowed) this.value = prevValue;
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
