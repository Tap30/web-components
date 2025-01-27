import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { requestFormSubmit } from "../base-input/utils.ts";
import { KeyboardKeys } from "../internals/index.ts";
import {
  createValidator,
  dispatchActivationClick,
  getFormValue,
  getValidityAnchor,
  isActivationClick,
  isHTMLElement,
  isHTMLInputElement,
  isSsr,
  logger,
  onReportValidity,
  redispatchEvent,
  runAfterRepaint,
  runImmediatelyBeforeRepaint,
  waitAMicrotask,
  withConstraintValidation,
  withElementInternals,
  withFormAssociated,
  withOnReportValidity,
  type Validator,
} from "../utils/index.ts";
import { DEFAULT_DISPLAY_VALUE } from "./constants.ts";
import { CompleteEvent } from "./events.ts";
import { isAlphaNumeric, isNumeric, stringConverter } from "./utils.ts";
import PinInputValidator from "./Validator.ts";

const BaseClass = withOnReportValidity(
  withConstraintValidation(
    withFormAssociated(withElementInternals(LitElement)),
  ),
);

export class PinInput extends BaseClass {
  /**
   * Indicates that the user must specify a value for the input before the
   * owning form can be submitted and will render an error state when
   * `reportValidity()` is invoked when value is empty.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Indicates whether or not a user should be able to edit the input's
   * value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
   */
  @property({ type: Boolean, reflect: true })
  public readOnly = false;

  /**
   * The label of the input.
   * - If the `hideLabel` property is true, the label will be hidden visually
   * but still accessible to screen readers.
   * - Otherwise, a visible label element will be rendered.
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
   * Whether to hide the label or not.
   */
  @property({ type: Boolean, attribute: "hide-label" })
  public hideLabel = false;

  /**
   * Defines the text displayed in the inputs when they have no value. Provides
   * a brief hint to the user as to the expected type of data that should be
   * entered into the control.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder
   */
  @property({ type: String, converter: stringConverter })
  public placeholder = "";

  /**
   * Describes what, if any, type of autocomplete functionality the input
   * should provide.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  @property({ type: String })
  public autocomplete: AutoFill = "";

  /**
   * Conveys additional information below the input, such as how it should
   * be used.
   */
  @property({ type: String, attribute: "supporting-text" })
  public supportingText = "";

  /**
   * Gets or sets whether or not the text input is in a visually invalid state.
   *
   * This error state overrides the error state controlled by
   * `reportValidity()`.
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
   * The error message that replaces supporting text when `error` is true. If
   * `errorText` is an empty string, then the supporting text will continue to
   * show.
   *
   * This error message overrides the error message displayed by
   * `reportValidity()`.
   */
  @property({ attribute: "error-text" })
  public errorText = "";

  /**
   * Determines which values can be entered.
   * Defaults to "alphanumeric".
   */
  @property()
  public type: "numeric" | "alphanumeric" = "alphanumeric";

  /**
   * Determines whether input values should be masked or not.
   */
  @property({ type: Boolean })
  public masked = false;

  /**
   * The number of inputs.
   * Defaults to 4.
   */
  @property({ type: Number })
  public pins = 4;

  /**
   * The number of each input's length.
   * Defaults to 1.
   */
  @property({ type: Number })
  public pinLength = 1;

  @state()
  private _dirty = false;

  @state()
  private _nativeError = false;

  @state()
  private _nativeErrorText = "";

  /**
   * When set to true, the error text's `role="alert"` will be removed, then
   * re-added after an animation frame. This will re-announce an error message
   * to screen readers.
   */
  @state()
  private _refreshErrorAlert = false;

  private _displayValue = DEFAULT_DISPLAY_VALUE;
  private _values: string[] = [];
  private _value = "";

  constructor() {
    super();

    this._handleActivationClick = this._handleActivationClick.bind(this);
    this._handleHostKeyDown = this._handleHostKeyDown.bind(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    /* eslint-disable @typescript-eslint/no-misused-promises */
    this.addEventListener("click", this._handleActivationClick);
    this.addEventListener("keydown", this._handleHostKeyDown);
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    /* eslint-disable @typescript-eslint/no-misused-promises */
    this.removeEventListener("click", this._handleActivationClick);
    this.removeEventListener("keydown", this._handleHostKeyDown);
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  public override attributeChangedCallback(
    attribute: string,
    newValue: string | null,
    oldValue: string | null,
  ) {
    if (attribute === "value" && this._dirty) {
      // After user input, changing the value attribute no longer updates the
      // text field's value (until reset). This matches native <input> behavior.
      return;
    }

    super.attributeChangedCallback(attribute, newValue, oldValue);
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

    if (this._refreshErrorAlert) {
      // The past render cycle removed the role="alert" from the error message.
      // Re-add it after an animation frame to re-announce the error.
      runImmediatelyBeforeRepaint(() => {
        this._refreshErrorAlert = false;
      });
    }
  }

  public override focus(options?: FocusOptions): void {
    const firstPin = this._pins[0];

    if (!firstPin) return;

    this._focusPin(firstPin, options);
  }

  public override blur(): void {
    const firstPin = this._pins[0];

    firstPin?.blur();
  }

  /**
   * Re-announces the field's error supporting text to screen readers.
   *
   * Error text announces to screen readers anytime it is visible and changes.
   * Use the method to re-announce the message when the text has not changed,
   * but announcement is still needed (such as for `reportValidity()`).
   */
  private _reannounceError() {
    this._refreshErrorAlert = true;
  }

  private get _pins() {
    return Array.from(
      this.renderRoot.querySelectorAll<HTMLInputElement>("input:not(#shadow)"),
    );
  }

  private _getPreviousPin(target: HTMLInputElement) {
    const pins = this._pins;
    const idx = pins.findIndex(pin => pin === target);

    if (idx === -1 || idx === 0) return null;

    return pins[idx - 1] ?? null;
  }

  private _getNextPin(target: HTMLInputElement) {
    const pins = this._pins;
    const idx = pins.findIndex(pin => pin === target);

    if (idx === -1 || idx === this.pins - 1) return null;

    return pins[idx + 1] ?? null;
  }

  private _hasError() {
    return this.error || this._nativeError;
  }

  private _getErrorText() {
    return this.error ? this.errorText : this._nativeErrorText;
  }

  private _getSupportingOrErrorText() {
    const errorText = this._getErrorText();

    return this._hasError() && errorText ? errorText : this.supportingText;
  }

  private _createPinArray(value: string) {
    return Array.from({ length: this.pins }).map((_, idx) => {
      const start = this.pinLength * idx;
      const end = start + this.pinLength;

      return value.substring(start, end);
    });
  }

  /**
   * Reset the input to its default value.
   */
  public reset() {
    this.value = this.getAttribute("value") ?? "";
    this._dirty = false;
    this._nativeError = false;
    this._nativeErrorText = "";
  }

  /**
   * The current value of the input. It is always a string.
   */
  @property()
  public get value() {
    return this._value;
  }

  public set value(newValue: string) {
    const update = () => {
      this._value = newValue;
      this._values = this._createPinArray(newValue);

      this.requestUpdate();
    };

    if (!this.hasUpdated) {
      void this.updateComplete.then(update);
    } else update();
  }

  /**
   * The value as an array.
   */
  public get valueAsArray() {
    if (isSsr() || !this.isConnected) return this._values;

    return this._pins.map(pin => pin.value);
  }

  private _setValues(arr: string[], shouldRender = false) {
    let newValues: string[] = [];

    if (arr.length > this.pins) {
      newValues = arr.slice(0, this.pins);
    } else if (arr.length < this.pins) {
      newValues = Array.from({ length: this.pins }).fill("") as string[];
      arr.forEach((v, i) => {
        newValues[i] = v;
      });
    } else {
      newValues = arr;
    }

    this._values = newValues;
    this._value = newValues.join("");

    const isComplete = this.pins * this.pinLength === this.value.length;

    if (shouldRender) this.requestUpdate();
    if (isComplete) this.dispatchEvent(new CompleteEvent());
  }

  /**
   * Retrieves or sets the function used to display values on inputs.
   */
  public get displayValue() {
    if (!this._displayValue) return DEFAULT_DISPLAY_VALUE;

    return this._displayValue;
  }

  public set displayValue(fn: (value: string) => string) {
    this._displayValue = fn;
  }

  private _setFocusOnArray(pinArray: string[]) {
    const filled = pinArray.filter(v => v.length !== 0);
    const pins = this._pins;

    if (pinArray.length === filled.length) {
      const lastPin = pins[pins.length - 1];

      if (lastPin) this._focusPin(lastPin);
    } else {
      const lastFilledIdx = filled.length - 1;
      const lastFilled = filled[lastFilledIdx]!;

      const idx =
        lastFilled.length === this.pinLength
          ? lastFilledIdx + 1
          : lastFilledIdx;

      const pin = pins[idx];

      if (pin) this._focusPin(pin);
    }
  }

  private _focusPin(pin: HTMLInputElement, options?: FocusOptions) {
    pin.select();
    pin.focus(options);
  }

  private _isValidValue(value: string) {
    if (!value) return true;
    if (this.type === "numeric") return isNumeric(value);

    return isAlphaNumeric(value);
  }

  private async _handleActivationClick(event: MouseEvent) {
    if (this.disabled) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    const firstPin = this._pins[0];

    if (!isActivationClick(event) || !firstPin) return;

    this._focusPin(firstPin);

    dispatchActivationClick(firstPin);
  }

  private async _handleHostKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      event.preventDefault();

      return;
    }

    const target = event.composedPath()[0] || event.target;

    if (!target) return;
    if (!(target instanceof HTMLInputElement)) return;

    if (event.key === KeyboardKeys.ENTER) {
      // allow event to propagate to user code after a microtask.
      await waitAMicrotask();

      if (event.defaultPrevented) return;

      requestFormSubmit(this);
    }

    if (
      event.key === KeyboardKeys.BACKSPACE ||
      event.key === KeyboardKeys.DELETE
    ) {
      if (target.value) return;

      event.preventDefault();

      const previousPin = this._getPreviousPin(target);

      if (!isHTMLElement(previousPin)) return;

      this._focusPin(previousPin);
    }
  }

  private _handleChange(event: Event) {
    redispatchEvent(this, event);
  }

  private _handleInput(event: InputEvent) {
    this._dirty = true;

    if (!isHTMLInputElement(event.target)) return;

    const idx = Number(event.target.getAttribute("data-index") ?? "-1");

    if (idx === -1 || Number.isNaN(idx)) return;

    const inputValue = event.target.value;
    const isValid = this._isValidValue(inputValue);

    if (!isValid) {
      this._setValues(this._values, true);

      return;
    }

    if (inputValue.length <= this.pinLength) {
      const values = this._values;

      values[idx] = inputValue;

      this._setValues(values, true);

      if (inputValue.length === this.pinLength) {
        const nextPin = this._getNextPin(event.target);

        if (nextPin) this._focusPin(nextPin);
      }

      return;
    }

    if (!event.data) return;

    if (idx === this.pins - 1 && event.data.length === 1) {
      this._setValues(this._values, true);

      return;
    }

    const pinArray = this._createPinArray(event.data);

    this._setValues(pinArray, true);
    this._setFocusOnArray(pinArray);
  }

  public override [getFormValue]() {
    return this.value;
  }

  public override formResetCallback() {
    this.reset();
  }

  public override formStateRestoreCallback(state: string) {
    this.value = state;
  }

  public override formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  public override [getValidityAnchor]() {
    return null;
  }

  public override [onReportValidity](invalidEvent: Event | null) {
    // Prevent default pop-up behavior.
    invalidEvent?.preventDefault();

    const prevMessage = this._getErrorText();

    this._nativeError = !!invalidEvent;
    this._nativeErrorText = this.validationMessage;

    if (prevMessage === this._getErrorText()) this._reannounceError();
  }

  public override [createValidator](): Validator<unknown> {
    return new PinInputValidator(() => ({
      pinLength: this.pinLength ?? 1,
      pins: this.pins ?? 4,
      value: this.value ?? "",
      required: this.required ?? false,
    }));
  }

  private _renderPins() {
    const type = this.masked ? "password" : "text";
    const inputMode = this.type === "numeric" ? "numeric" : "text";
    const invalid = this._hasError();
    const label = this.hideLabel ? this.label || nothing : nothing;
    const labelledBy = this.label ? nothing : this.labelledBy || nothing;
    const describedBy = this.supportingText ? "supporting-text" : nothing;

    return Array.from({ length: this.pins }).map(
      (_, idx) => html`
        <input
          class="input"
          part="input"
          id="input-${idx}"
          type=${type}
          inputmode=${inputMode}
          data-index=${idx}
          aria-invalid=${invalid}
          aria-label=${label}
          aria-labelledby=${labelledBy}
          aria-describedby=${describedBy}
          aria-required=${this.required}
          ?readonly=${this.readOnly}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder || nothing}
          autocomplete=${this.autocomplete || nothing}
          name=${this.name || nothing}
          .value=${live(this.displayValue(this._values[idx] ?? ""))}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
      `,
    );
  }

  private _renderLabel() {
    if (this.hideLabel) return null;
    if (!this.label) return null;

    return html`
      <label
        for="input-0"
        class="label"
        part="label"
      >
        ${this.label}
      </label>
    `;
  }

  private _renderHelperText() {
    const text = this._getSupportingOrErrorText();

    if (!text) return null;

    // Announce if there is an error and error text visible.
    // If `_refreshErrorAlert` is true, do not announce. This will remove the
    // role="alert" attribute. Another render cycle will happen after an
    // animation frame to re-add the role.
    const shouldAnnounceError =
      this._hasError() && this._getErrorText() && !this._refreshErrorAlert;

    const role = shouldAnnounceError ? "alert" : nothing;

    return html`
      <div
        class="supporting-text"
        part="supporting-text"
      >
        <span
          class="sr-only"
          id="supporting-text"
        >
          ${this.supportingText}
        </span>
        <span role=${role}>${text}</span>
      </div>
    `;
  }

  protected override render() {
    const hasValidLabel = Boolean(this.label || this.labelledBy);

    const rootClasses = classMap({
      root: true,
      disabled: this.disabled,
      error: this._hasError(),
      readonly: this.readOnly,
    });

    if (!hasValidLabel) {
      logger(
        "Expected a valid `label` or `labelledby` attribute, received none.",
        "pin-input",
        "error",
      );
    }

    return html`
      <div
        part="root"
        class=${rootClasses}
        ?inert=${this.disabled}
      >
        ${this._renderLabel()}
        <div
          class="pins"
          part="pins"
        >
          ${this._renderPins()}
        </div>
        ${this._renderHelperText()}
      </div>
    `;
  }
}
