import { register as registerIconButton } from "../button/icon-button/index.ts";
import { register as registerSpinner } from "../spinner/index.ts";

import {
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
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
  runAfterRepaint,
  toFaNumber,
  waitAMicrotask,
  withConstraintValidation,
  withElementInternals,
  withFormAssociated,
  withOnReportValidity,
} from "../utils/index.ts";
import { ErrorMessages, scope, Slots } from "./constants.ts";
import { RetryEvent } from "./events.ts";
import styles from "./file-input.style.ts";
import { clear, error, image } from "./icons.ts";
import {
  getProgressUiParams,
  isFileImage,
  isStringNumber,
  loadingConverter,
} from "./utils.ts";
import FileInputValidator from "./Validator.ts";

interface TapsiFileInputEventMap extends HTMLElementEventMap {
  [RetryEvent.type]: RetryEvent;
}

const BaseClass = withOnReportValidity(
  withConstraintValidation(
    withFormAssociated(withElementInternals(LitElement)),
  ),
);

/**
 * @summary Used to select and upload files or drag and drop files.
 *
 * @tag tapsi-file-input
 *
 * @slot [placeholder-icon] - The slot for icon placeholder.
 *
 * @fires {RetryEvent} retry - Fires when the retry button is clicked. (bubbles)
 * @fires {Event} change -
 * Fires when the user modifies the element's value.
 * Unlike the `input` event, the change event is not necessarily fired for each
 * alteration to an element's `value`. (bubbles)
 * @fires {Event} input -
 * Fires when the value of an input element has been changed as a direct result
 * of a user action. (bubbles)
 */
export class FileInput extends BaseClass {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

  /** @internal */
  declare addEventListener: <K extends keyof TapsiFileInputEventMap>(
    type: K,
    listener: (this: FileInput, ev: TapsiFileInputEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /** @internal */
  declare removeEventListener: <K extends keyof TapsiFileInputEventMap>(
    type: K,
    listener: (this: FileInput, ev: TapsiFileInputEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;

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
   * Indicates the loading state of the component.
   *
   * - If `false`, the component is not in a loading state.
   * - If `true`, a spinner will appear indicating the component is loading.
   * - If a number between 0 and 100, it shows the percentage of the loading state.
   *
   * @prop {boolean | number} loading
   * @attr {string} loading
   * @default false
   */
  @property({ converter: loadingConverter })
  public loading: boolean | number = false;

  /**
   * Conveys additional information below the file input, such as how it should
   * be used.
   *
   * @prop {string} supportingText
   * @attr {string} supporting-text
   * @default ""
   */
  @property({ attribute: "supporting-text" })
  public supportingText = "";

  /**
   * Whether the file input allows the user to select more than one file.
   *
   * @prop {boolean} multiple
   * @attr {string} multiple
   * @default false
   */
  @property({ type: Boolean })
  public multiple = false;

  /**
   * Indicates whether or not a user should be able to edit the file input's
   * value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
   *
   * @prop {boolean} readOnly
   * @attr {string} readonly
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public readOnly = false;

  /**
   * The text showing in file input when it is in loading state.
   *
   * @prop {string} loadingText
   * @attr {string} loading-text
   * @default "در حال بارگذاری..."
   */
  @property({ attribute: "loading-text" })
  public loadingText = "در حال بارگذاری...";

  /**
   * The error message that replaces supporting text when `error` is true. If
   * `errorText` is an empty string, then the supporting text will continue to
   * show.
   *
   * This error message overrides the error message displayed by
   * `reportValidity()`.
   *
   * @prop {string} errotText
   * @attr {string} error-text
   * @default ""
   */
  @property({ attribute: "error-text" })
  public errorText = "";

  /**
   * Whether the file input has error.
   *
   * @prop {boolean} error
   * @attr {string} error
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
   * Whether the file input has retry button in error state.
   *
   * @prop {boolean} retryableError
   * @attr {string} retryable-error
   * @default false
   */
  @property({ type: Boolean, attribute: "retryable-error" })
  public retryableError = false;

  /**
   * Used for showing camera for mobile devices.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#capture
   *
   * @prop {string} capture
   * @attr {string} capture
   * @default ""
   */
  @property()
  public capture = "";

  /**
   * The list of selected files.
   *
   * @prop {FileList | null} files
   * @default null
   */
  @property({ attribute: false })
  public files: FileList | null = null;

  /**
   * Specifying what file format does the file input accepts.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   *
   * @prop {string} accept
   * @attr {string} accept
   * @default ""
   */
  @property()
  public accept = "";

  /**
   * A placeholder text for the input component when no file has been selected.
   *
   * @prop {string} placeholder
   * @attr {string} placeholder
   * @default "انتخاب فایل"
   */
  @property()
  public placeholder = "انتخاب فایل";

  /**
   * The label of the file input.
   * - If the `hideLabel` property is true, the label will be hidden visually
   * but still accessible to screen readers.
   * - Otherwise, a visible label element will be rendered.
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
   * Whether to hide the label or not.
   *
   * @prop {boolean} hideLabel
   * @attr {string} hide-label
   * @default false
   */
  @property({ type: Boolean, attribute: "hide-label" })
  public hideLabel = false;

  /**
   * Indicates that the user must specify a value for the input before the
   * owning form can be submitted and will render an error state when
   * `reportValidity()` is invoked when value is empty.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   *
   * @prop {boolean} required
   * @attr {string} required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Indicates that the element should be focused on page load.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
   *
   * @prop {boolean} autofocus
   * @attr {string} autofocus
   * @default false
   */
  @property({ type: Boolean })
  public override autofocus = false;

  /**
   * The current value of the input. It is always a string.
   *
   * @prop {string} value
   * @attr {string} value
   * @default ""
   */
  @property()
  public set value(newValue: string) {
    if (newValue) {
      logger(ErrorMessages.INVALID_VALUE, scope, "error");

      return;
    }

    this._value = newValue;
  }

  public get value(): string {
    return this._value;
  }

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

  @query("#root", true)
  private _root!: HTMLInputElement | null;

  @query("#input", true)
  private _input!: HTMLInputElement | null;

  private _value: string = "";

  constructor() {
    super();

    registerIconButton();
    registerSpinner();

    this._handleDrop = this._handleDrop.bind(this);
    this._handleActivationClick = this._handleActivationClick.bind(this);
  }

  protected override firstUpdated(changed: PropertyValues<this>): void {
    super.firstUpdated(changed);

    runAfterRepaint(() => {
      if (!this.autofocus) return;

      this.focus();
    });
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

    this._handlePlaceholderIconSlotChange();
  }

  protected override updated(changed: PropertyValues<this>): void {
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

  /** @internal */
  public override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("drop", this._handleDrop);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.addEventListener("click", this._handleActivationClick);
  }

  /** @internal */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener("drop", this._handleDrop);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.removeEventListener("click", this._handleActivationClick);
  }

  /** @internal */
  public override focus(options?: FocusOptions): void {
    this._root?.focus(options);
  }

  /** @internal */
  public override blur(): void {
    this._root?.blur();
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

  /** @internal */
  public override [getFormValue](): string {
    return this._value;
  }

  /** @internal */
  public override [getFormState](): string {
    return String(this._value);
  }

  /** @internal */
  public override formResetCallback(): void {
    this.reset();
  }

  /** @internal */
  public override formStateRestoreCallback(state: string): void {
    this._value = state;
  }

  /** @internal */
  public override [createValidator](): FileInputValidator {
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

  /** @internal */
  public override formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  /** @internal */
  public override [getValidityAnchor](): null {
    return null;
  }

  /** @internal */
  public override [onReportValidity](invalidEvent: Event | null): void {
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
        ErrorMessages.ERROR_AND_LOADING_ATTRIBUTES_AT_THE_SAME_TIME,
        scope,
        "error",
      );
    }

    if (!this._hasValidLabel()) {
      logger(
        ErrorMessages.SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE,
        scope,
        "error",
      );
    }

    if (isStringNumber(this.loading.toString())) {
      const loading = parseInt(this.loading.toString());

      if (!(0 <= loading && loading <= 100)) {
        logger(ErrorMessages.INVALID_LOADING_VALUE, scope, "error");
      }
    }
  }

  /**
   * Reset the text field to its default value.
   */
  public reset(): void {
    this._value = "";
    this._previewSrc = null;
    this._nativeError = false;
    this._nativeErrorText = "";
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

      if (isFileImage(file.name) && this._previewSrc) {
        return html`<img
          src=${this._previewSrc}
          alt="preview"
          class="preview"
          part="preview"
        />`;
      }

      return html`<span
        class="text"
        part="text"
        >${file.name}</span
      >`;
    }

    return html`<span
      class="text"
      part="text"
      >${toFaNumber(this.files.length.toString())} فایل انتخاب شده</span
    >`;
  }

  private _renderLoadingState() {
    const isNumber = isStringNumber(String(this.loading));

    let icon;

    if (!isNumber) {
      icon = html`<div
        class="spinner"
        part="spinner"
      >
        <tapsi-spinner></tapsi-spinner>
      </div>`;
    } else {
      const { offset, progressSize, progressStroke, circumference, radius } =
        getProgressUiParams(parseInt(this.loading.toString()));

      icon = html`<div
        class="progress-wrapper"
        part="progress-wrapper"
      >
        <svg
          class="progress"
          part="progress"
          viewBox="0 0 48 48"
        >
          <circle
            class="background-circle"
            part="background-circle"
            cx=${progressSize}
            cy=${progressSize}
            r=${radius}
            stroke-width=${progressStroke}
            fill="none"
          />
          <circle
            class="foreground-circle"
            part="foreground-circle"
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
        <span
          class="percentage"
          part="percentage"
          >${toFaNumber(this.loading.toString())}٪</span
        >
      </div>`;
    }

    return html`<div
      class="loading-state"
      part="loading-state"
    >
      ${icon}
      <span
        class="text"
        part="text"
        >${this.loadingText}</span
      >
    </div>`;
  }

  private _renderRetry() {
    if (!this.retryableError) return null;

    return html`<tapsi-button
      size="sm"
      variant="ghost"
      class="error-action"
      part="error-action"
      @click=${() => this.dispatchEvent(new RetryEvent())}
    >
      تلاش مجدد
    </tapsi-button>`;
  }

  private _renderErrorState() {
    return html` <div
      class="error-state"
      part="error-state"
    >
      <div
        class="icon"
        part="icon"
      >
        ${error}
      </div>
      ${this._renderRetry()}
    </div>`;
  }

  private _renderEmptyState() {
    return html`
      <div
        class="empty-state"
        part="empty-state"
      >
        <div
          class="icon"
          part="icon"
          ?hidden=${!this._hasPlaceholderIconSlot}
        >
          <slot
            name=${Slots.PLACEHOLDER_ICON}
            @slotchange=${this._handlePlaceholderIconSlotChange}
          ></slot>
        </div>

        <div
          class="icon"
          part="icon"
          ?hidden=${this._hasPlaceholderIconSlot}
        >
          ${image}
        </div>
        <span
          class="placeholder"
          part="placeholder"
          >${this.placeholder}</span
        >
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
      return html`<tapsi-icon-button
        class="clear-button"
        part="clear-button"
        @click=${this.reset}
        label="clear"
        variant="elevated"
        size="sm"
      >
        ${clear}
      </tapsi-icon-button>`;

    return null;
  }

  protected override render(): TemplateResult {
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
        id="root"
        part="root"
        class=${rootClasses}
        ?inert=${this.disabled}
        tabindex=${this.disabled ? "-1" : "0"}
      >
        ${this._renderLabel()}
        <div
          class="control"
          part="control"
        >
          <input
            class="input"
            part="input"
            type="file"
            id="input"
            aria-invalid=${this._hasError()}
            aria-label=${ariaLabel}
            aria-labelledby=${ariaLabelledBy}
            aria-describedby=${ariaDescribedBy}
            ?disabled=${this.disabled || this._isLoading()}
            ?multiple=${this.multiple}
            ?readonly=${this.readOnly}
            capture=${this.capture || nothing}
            accept=${this.accept || nothing}
            ?required=${this.required}
            @input=${this._handleInput}
            @change=${this._handleChange}
            .value=${live(this._value)}
          />
          <div
            class="file-input"
            part="file-input"
          >
            ${this._renderFileInputContent()}${this._renderClearIcon()}
          </div>
        </div>
        ${this._renderHelperText()}
      </div>
    `;
  }
}
