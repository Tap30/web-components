import { html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { type ClassInfo, classMap } from "lit/directives/class-map.js";
import BaseInput from "../base-input/index.ts";
import {
  getFormValue,
  getValidityAnchor,
  isSsr,
  onReportValidity,
  redispatchEvent,
} from "../utils/index.ts";
import { Slots } from "./constants.ts";
import { stringConverter } from "./utils.ts";

/**
 * @slot [leading-icon] - the leading icon slot of the input
 * @slot [trailing] - the trailing slot of the input
 */
export abstract class BaseTextInput extends BaseInput {
  /**
   * The maximum number of characters a user can enter into the text input. Set
   * to -1 for none.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength
   *
   * @prop {number} maxLength
   * @attr {string} maxlength
   * @default -1
   */
  @property({ type: Number })
  public maxLength = -1;

  /**
   * The minimum number of characters a user can enter into the text input. Set
   * to -1 for none.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength
   *
   * @prop {number} minLength
   * @attr {string} minlength
   * @default -1
   */
  @property({ type: Number })
  public minLength = -1;

  /**
   * Defines the text displayed in the text input when it has no value. Provides
   * a brief hint to the user as to the expected type of data that should be
   * entered into the control.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder
   *
   * @prop {string} placeholder
   * @attr {string} placeholder
   * @default ""
   */
  @property({ converter: stringConverter })
  public placeholder = "";

  /**
   * Indicates whether or not a user should be able to edit the text input's
   * value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
   */
  @property({ type: Boolean, reflect: true })
  public readOnly = false;

  /**
   * Describes what, if any, type of autocomplete functionality the input
   * should provide.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   *
   * @prop {AutoFill} autocomplete
   * @attr {AutoFill} autocomplete
   * @default ""
   */
  @property()
  public autocomplete: AutoFill = "";

  /**
   * Conveys additional information below the text input, such as how it should
   * be used.
   *
   * @prop {string} supportingText
   * @attr {string} supporting-text
   * @default ""
   */
  @property({ attribute: "supporting-text" })
  public supportingText = "";

  /**
   * Gets or sets whether or not the text input is in a visually invalid state.
   *
   * This error state overrides the error state controlled by
   * `reportValidity()`.
   *
   * @prop {boolean} error
   * @attr {string} error
   * @default false
   */
  @property({ type: Boolean })
  public error = false;

  /**
   * The error message that replaces supporting text when `error` is true. If
   * `errorText` is an empty string, then the supporting text will continue to
   * show.
   *
   * This error message overrides the error message displayed by
   * `reportValidity()`.
   *
   * @prop {string} errorText
   * @attr {string} error-text
   * @default ""
   */
  @property({ attribute: "error-text" })
  public errorText = "";

  /**
   * The label of the text input.
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
  public override label = "";

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
   * Whether the input is rounded or not.
   *
   * @prop {boolean} rounded
   * @attr {string} rounded
   * @default false
   */
  @property({ type: Boolean })
  public rounded = false;

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
   * Whether to show the active border around the input or not.
   *
   * @prop {boolean} noActiveBorder
   * @attr {string} no-active-border
   * @default false
   */
  @property({ type: Boolean, attribute: "no-active-border" })
  public noActiveBorder = false;

  @state()
  private _dirty = false;

  @state()
  private _nativeError = false;

  @state()
  private _nativeErrorText = "";

  @state()
  protected hasTrailingSlot = false;

  @state()
  protected hasLeadingIconSlot = false;

  /**
   * When set to true, the error text's `role="alert"` will be removed, then
   * re-added after an animation frame. This will re-announce an error message
   * to screen readers.
   */
  @state()
  private _refreshErrorAlert = false;

  @queryAssignedNodes({ slot: Slots.LEADING_ICON })
  private _leadingIconSlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.TRAILING })
  private _trailingSlotNodes!: Node[];

  /**
   * Selects all the text in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
   *
   * @internal
   */
  public select(): void {
    this.getInputElement()?.select();
  }

  /**
   * Reset the text field to its default value.
   */
  public reset(): void {
    this.value = this.getAttribute("value") ?? "";
    this._dirty = false;
    this._nativeError = false;
    this._nativeErrorText = "";
  }

  protected hasError(): boolean {
    return this.error || this._nativeError;
  }

  protected getErrorText(): string {
    return this.error ? this.errorText : this._nativeErrorText;
  }

  protected getSupportingOrErrorText(): string {
    const errorText = this.getErrorText();

    return this.hasError() && errorText ? errorText : this.supportingText;
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
  public override attributeChangedCallback(
    attribute: string,
    newValue: string | null,
    oldValue: string | null,
  ): void {
    if (attribute === "value" && this._dirty) {
      // After user input, changing the value attribute no longer updates the
      // text field's value (until reset). This matches native <input> behavior.
      return;
    }

    super.attributeChangedCallback(attribute, newValue, oldValue);
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
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

    this._handleLeadingIconSlotChange();
    this._handleTrailingSlotChange();
  }

  private _handleLeadingIconSlotChange() {
    if (!isSsr()) {
      this.hasLeadingIconSlot = this._leadingIconSlotNodes.length > 0;
    }
  }

  private _handleTrailingSlotChange() {
    if (!isSsr()) {
      this.hasTrailingSlot = this._trailingSlotNodes.length > 0;
    }
  }

  protected override getInputElement():
    | HTMLInputElement
    | HTMLTextAreaElement
    | null {
    if (!this.renderRoot) return null;

    return this.renderRoot.querySelector<
      HTMLInputElement | HTMLTextAreaElement
    >("#input");
  }

  protected handleInput(event: Event): void {
    this._dirty = true;
    this.value = (event.target as HTMLInputElement).value;
  }

  protected handleSelect(event: Event): void {
    redispatchEvent(this, event);
  }

  protected handleChange(event: Event): void {
    redispatchEvent(this, event);
  }

  /** @internal */
  public override [getFormValue](): string {
    return this.value;
  }

  /** @internal */
  public override formResetCallback(): void {
    this.reset();
  }

  /** @internal */
  public override formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  /** @internal */
  public override [getValidityAnchor]():
    | HTMLInputElement
    | HTMLTextAreaElement
    | null {
    return this.getInputElement();
  }

  /** @internal */
  public override [onReportValidity](invalidEvent: Event | null): void {
    // Prevent default pop-up behavior.
    invalidEvent?.preventDefault();

    const prevMessage = this.getErrorText();

    this._nativeError = !!invalidEvent;
    this._nativeErrorText = this.validationMessage;

    if (prevMessage === this.getErrorText()) this._reannounceError();
  }

  protected override renderTrailingContent(): TemplateResult | null {
    const text = this.getSupportingOrErrorText();

    if (!text) return null;

    // Announce if there is an error and error text visible.
    // If `_refreshErrorAlert` is true, do not announce. This will remove the
    // role="alert" attribute. Another render cycle will happen after an
    // animation frame to re-add the role.
    const shouldAnnounceError =
      this.hasError() && this.getErrorText() && !this._refreshErrorAlert;

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

  protected override renderLeadingContent(): TemplateResult | null {
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

  protected abstract renderInput(): TemplateResult;

  protected override getRootClasses(): ClassInfo {
    const parentRootClasses = super.getRootClasses();

    return {
      ...parentRootClasses,
      [this.size]: true,
    };
  }

  protected override renderControl(): TemplateResult {
    const controlClasses = classMap({
      control: true,
      error: this.hasError(),
      readonly: this.readOnly,
      rounded: this.rounded,
      "no-active-border": this.noActiveBorder,
    });

    return html`
      <div
        class=${controlClasses}
        part="control"
        ?inert=${this.disabled}
      >
        <div
          aria-hidden="true"
          class=${Slots.LEADING_ICON}
          part=${Slots.LEADING_ICON}
          ?hidden=${!this.hasLeadingIconSlot}
        >
          <slot
            @slotchange=${this._handleLeadingIconSlotChange}
            name=${Slots.LEADING_ICON}
          ></slot>
        </div>
        ${this.renderInput()}
        <div
          class=${Slots.TRAILING}
          part=${Slots.TRAILING}
          ?hidden=${!this.hasTrailingSlot}
        >
          <slot
            @slotchange=${this._handleTrailingSlotChange}
            name=${Slots.TRAILING}
          ></slot>
        </div>
      </div>
    `;
  }
}
