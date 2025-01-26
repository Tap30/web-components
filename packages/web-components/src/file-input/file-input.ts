import "../button/icon-button/index.ts";
import "../spinner/index.ts";

import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import {
  createValidator,
  dispatchActivationClick,
  getFormState,
  getFormValue,
  getValidityAnchor,
  isActivationClick,
  isSsr,
  logger,
  onReportValidity,
  redispatchEvent,
  toFaNumber,
  waitAMicrotask,
  withConstraintValidation,
  withElementInternals,
  withFormAssociated,
  withOnReportValidity,
} from "../utils/index.ts";
import { Slots } from "./constants.ts";
import { RetryEvent } from "./events.ts";
import { clear, error, image } from "./icons.ts";
import { getProgressUiParams, isFileImage, isStringNumber } from "./utils.ts";
import FileInputValidator from "./Validator.ts";

const BaseClass = withOnReportValidity(
  withConstraintValidation(
    withFormAssociated(withElementInternals(LitElement)),
  ),
);

export class FileInput extends BaseClass {
  /**
   * Identifies the element (or elements) that labels the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   */
  @property({ type: String })
  public labelledBy = "";

  /**
   * Indicates the loading state of the component.
   *
   * - If `false`, the component is not in a loading state.
   * - If `true`, a spinner will appear indicating the component is loading.
   * - If a number between 0 and 100, it shows the percentage of the loading state.
   */
  @property()
  public loading: boolean | number = false;

  /**
   * Conveys additional information below the file input, such as how it should
   * be used.
   */
  @property({ type: String, attribute: "supporting-text" })
  public supportingText = "";

  /**
   * Whether the file input allows the user to select more than one file.
   */
  @property({ type: Boolean })
  public multiple = false;

  /**
   * Indicates whether or not a user should be able to edit the file input's
   * value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
   */
  @property({ type: Boolean, reflect: true })
  public readOnly = false;

  /**
   * The text showing in file input when it is in loading state.
   */
  @property({ type: String, attribute: "loading-text" })
  public loadingText = "در حال بارگذاری...";

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
   * Whether the file input has error.
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
   * Used for showing camera for mobile devices.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#capture
   */
  @property({ type: String })
  public capture = "";

  /**
   * The list of selected files.
   */
  @property({ attribute: false })
  public files: FileList | null = null;

  /**
   * Specifying what file format does the file input accepts.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  @property({ type: String })
  public accept = "";

  /**
   * A placeholder text for the input component when no file has been selected.
   */
  @property({ type: String })
  public placeholder = "انتخاب فایل";

  /**
   * The label of the file input.
   * - If the `hideLabel` property is true, the label will be hidden visually
   * but still accessible to screen readers.
   * - Otherwise, a visible label element will be rendered.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  /**
   * Whether to hide the label or not.
   */
  @property({ type: Boolean, attribute: "hide-label" })
  public hideLabel = false;

  /**
   * Indicates that the user must specify a value for the input before the
   * owning form can be submitted and will render an error state when
   * `reportValidity()` is invoked when value is empty.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  @state()
  private _hasPlaceholderIconSlot = false;

  /**
   * When set to true, the error text's `role="alert"` will be removed, then
   * re-added after an animation frame. This will re-announce an error message
   * to screen readers.
   */
  @state()
  private _refreshErrorAlert = false;

  @state()
  private _nativeError = false;

  @state()
  private _previewSrc: null | string = null;

  @state()
  private _nativeErrorText = "";

  @queryAssignedNodes({ slot: Slots.PLACEHOLDER_ICON })
  private _placeholderIconSlotNodes!: Node[];

  @query("#input", true)
  private _input!: HTMLInputElement | null;

  private _value: string = "";

  constructor() {
    super();

    this._handleDrop = this._handleDrop.bind(this);
    this._handleActivationClick = this._handleActivationClick.bind(this);
  }

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    this._handlePlaceholderIconSlotChange();
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (this._refreshErrorAlert) {
      // The past render cycle removed the role="alert" from the error message.
      // Re-add it after an animation frame to re-announce the error.
      requestAnimationFrame(() => {
        this._refreshErrorAlert = false;
      });
    }

    this._logErrors();
  }

  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener("drop", this._handleDrop);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.addEventListener("click", this._handleActivationClick);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("drop", this._handleDrop);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.removeEventListener("click", this._handleActivationClick);
  }

  private _handleInput(event: Event) {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;

    this.files = target.files;

    const file = this.files?.[0];

    if (file) {
      this._value = target.value;
      this._previewSrc = URL.createObjectURL(file);
    }
  }

  private _handleChange(event: Event) {
    if (this.disabled) return;

    // <input> 'change' event is not composed, re-dispatch it.
    redispatchEvent(this, event);
  }

  private _handlePlaceholderIconSlotChange() {
    if (!isSsr()) {
      this._hasPlaceholderIconSlot = this._placeholderIconSlotNodes.length > 0;
    }
  }

  private _handleDrop(event: DragEvent) {
    event.preventDefault();

    if (!event.dataTransfer) return;

    const files = event.dataTransfer.files;

    if (!files || files.length === 0) return;

    const input = this._input;

    if (!input) return;

    input.files = files;

    this.files = files;
    this._value = input.value;
    this._previewSrc = URL.createObjectURL(files[0]!);

    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  }

  private async _handleActivationClick(event: MouseEvent) {
    if (this.disabled) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    if (!isActivationClick(event) || !this._input) return;

    dispatchActivationClick(this._input);
  }

  private _hasError() {
    return this.error || this._nativeError;
  }

  public override [getFormValue]() {
    return this._value;
  }

  public override [getFormState]() {
    return String(this._value);
  }

  public override formResetCallback() {
    this.reset();
  }

  public override formStateRestoreCallback(state: string) {
    this._value = state;
  }

  public override [createValidator]() {
    return new FileInputValidator(() => ({
      required: this.required ?? false,
      value: this.value ?? "",
    }));
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

  private _hasValidLabel() {
    return Boolean(this.label || this.labelledBy);
  }

  private _logErrors() {
    if (this._isLoading() && this.error) {
      logger(
        "The File input cannot have `error` and `loading` state at the same time.",
        "file-input",
        "error",
      );
    }

    if (!this._hasValidLabel()) {
      logger(
        "Expected a valid `label` or `labelledby` attribute, received none.",
        "file-input",
        "error",
      );
    }

    if (isStringNumber(this.loading.toString())) {
      const loading = parseInt(this.loading.toString());

      if (!(0 <= loading && loading <= 100)) {
        logger(
          "the `loading` value should be between 0 and 100",
          "file-input",
          "error",
        );
      }
    }
  }

  /**
   * Reset the text field to its default value.
   */
  public reset() {
    this._value = "";
    this._previewSrc = null;
    this._nativeError = false;
    this._nativeErrorText = "";
  }

  @property()
  public set value(newValue: string) {
    if (newValue) {
      logger(
        [
          "Failed to set the 'value' property on 'TapsiFileInput':",
          "This input element accepts a filename, which may only be",
          "programmatically set to the empty string.",
        ].join(" "),
        "file-input",
        "error",
      );

      return;
    }

    this._value = newValue;
  }

  public get value() {
    return this._value;
  }

  private _getErrorText() {
    return this.error ? this.errorText : this._nativeErrorText;
  }

  private _getSupportingOrErrorText() {
    const errorText = this._getErrorText();

    return this._hasError() && errorText ? errorText : this.supportingText;
  }

  private _isLoading() {
    return this.loading.toString() !== "false";
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

    return html`<div
      part="supporting-text"
      class="supporting-text"
    >
      <span
        class="sr-only"
        id="supporting-text"
      >
        ${this.supportingText}
      </span>
      <span role=${role}>${text}</span>
    </div>`;
  }

  private _renderLabel() {
    if (this.hideLabel) return null;
    if (!this.label) return null;

    return html`
      <label
        for="input"
        class="label"
        part="label"
      >
        ${this.label}
      </label>
    `;
  }

  private _renderPreview() {
    if (!this.files) return null;

    if (this.files.length === 1) {
      const file = this.files[0]!;

      if (isFileImage(file.name)) {
        return html`<img
          src=${this._previewSrc}
          alt="preview"
          class="preview"
        />`;
      }

      return html`<span class="text">${file.name}</span>`;
    }

    return html`<span class="text"
      >${toFaNumber(this.files.length.toString())} فایل انتخاب شده</span
    >`;
  }

  private _renderLoadingState() {
    const isNumber = isStringNumber(String(this.loading));

    let icon;

    if (!isNumber) {
      icon = html`<div class="spinner">
        <tapsi-spinner></tapsi-spinner>
      </div>`;
    } else {
      const { offset, progressSize, progressStroke, circumference, radius } =
        getProgressUiParams(parseInt(this.loading.toString()));

      icon = html`<div class="progress-wrapper">
        <svg
          class="progress"
          viewBox="0 0 48 48"
        >
          <circle
            class="background-circle"
            cx=${progressSize}
            cy=${progressSize}
            r=${radius}
            stroke-width=${progressStroke}
            fill="none"
          />
          <circle
            class="foreground-circle"
            cx=${progressSize}
            cy=${progressSize}
            r=${radius}
            stroke-width=${progressStroke}
            stroke-linecap="round"
            fill="none"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
          />
        </svg>
        <span class="percentage">${toFaNumber(this.loading.toString())}٪</span>
      </div>`;
    }

    return html`<div class="loading-state">
      ${icon}
      <span class="text">${this.loadingText}</span>
    </div>`;
  }

  private _handleRetry() {
    this.dispatchEvent(new RetryEvent());
  }

  private _renderErrorState() {
    return html` <div class="error-state">
      <div class="icon">${error}</div>
      <tapsi-button
        size="sm"
        variant="ghost"
        class="error-action"
        @click=${this._handleRetry}
      >
        تلاش مجدد
      </tapsi-button>
    </div>`;
  }

  private _renderEmptyState() {
    return html`
      <div class="empty-state">
        <div
          class="icon"
          ?hidden=${!this._hasPlaceholderIconSlot}
        >
          <slot
            name=${Slots.PLACEHOLDER_ICON}
            @slotchange=${this._handlePlaceholderIconSlotChange}
          ></slot>
        </div>

        <div
          class="icon"
          ?hidden=${this._hasPlaceholderIconSlot}
        >
          ${image}
        </div>
        <span class="placeholder">${this.placeholder}</span>
      </div>
    `;
  }

  private _renderFileInputContent() {
    if (this._hasError()) return this._renderErrorState();

    if (this._isLoading()) return this._renderLoadingState();

    if (this.value) return this._renderPreview();

    return this._renderEmptyState();
  }

  private _renderClearIcon() {
    if (this._value)
      return html` <div class="clear-button">
        <tapsi-icon-button
          @click=${this.reset}
          label="clear"
          variant="elevated"
          size="sm"
        >
          ${clear}
        </tapsi-icon-button>
      </div>`;

    return null;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      disabled: this.disabled,
      loading: this._isLoading(),
      readonly: this.readOnly,
      error: this._hasError(),
    });

    const ariaLabel = this.hideLabel ? this.label || nothing : nothing;
    const ariaLabelledBy = this.label ? nothing : this.labelledBy || nothing;
    const ariaDescribedBy = this.supportingText ? "supporting-text" : nothing;

    return html`
      <div
        part="root"
        class=${rootClasses}
        ?inert=${this.disabled}
      >
        ${this._renderLabel()}
        <div
          class="control"
          part="control"
        >
          <input
            part="input"
            type="file"
            id="input"
            class="input"
            aria-invalid=${this._hasError()}
            aria-label=${ariaLabel}
            aria-labelledby=${ariaLabelledBy}
            aria-describedby=${ariaDescribedBy}
            ?disabled=${this.disabled || this._isLoading()}
            ?multiple=${this.multiple}
            ?readonly=${this.readOnly}
            capture=${ifDefined(this.capture)}
            accept=${ifDefined(this.accept)}
            ?required=${this.required}
            @input=${this._handleInput}
            @change=${this._handleChange}
            .value=${live(this._value)}
          />
          <div
            part="file-input"
            class="file-input"
          >
            ${this._renderFileInputContent()}${this._renderClearIcon()}
          </div>
        </div>
        ${this._renderHelperText()}
      </div>
    `;
  }
}
