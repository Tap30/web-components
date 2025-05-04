import { html, nothing, type CSSResultGroup, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import baseInputStyle from "../base-input/base-input.style.ts";
import BaseInput from "../base-input/index.ts";
import {
  createValidator,
  getFormState,
  getFormValue,
  logger,
  onReportValidity,
  redispatchEvent,
} from "../utils/index.ts";
import styles from "./checkbox.style.ts";
import CheckboxValidator from "./Validator.ts";

/**
 * @summary Checkboxes allow the user to select one or more items from a set.
 *
 * @tag "tapsi-checkbox"
 */
export class Checkbox extends BaseInput {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [
    baseInputStyle,
    styles,
  ];

  /**
   * Whether or not the checkbox is selected.
   *
   * @prop {boolean} checked
   * @attr {string} checked
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Whether or not the checkbox is indeterminate.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
   *
   * @prop {boolean} indeterminate
   * @attr {string} indeterminate
   * @default false
   */
  @property({ type: Boolean })
  public indeterminate = false;

  /**
   * The value of the checkbox that is submitted with a form when selected.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value
   *
   * @prop {string} value
   * @attr {string} value
   * @default "on"
   */
  @property()
  public override value = "on";

  /**
   * Whether the checkbox has error.
   *
   * @prop {boolean} error
   * @attr {string} error
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  @state()
  private _nativeError = false;

  private _handleInput(event: Event) {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;

    this.checked = target.checked;
    this.indeterminate = target.indeterminate;

    // <input> 'input' event bubbles and is composed, don't re-dispatch it.
  }

  private _handleChange(event: Event) {
    if (this.disabled) return;
    // <input> 'change' event is not composed, re-dispatch it.
    redispatchEvent(this, event);
  }

  protected override getInputElement(): HTMLInputElement | null {
    if (!this.renderRoot) return null;

    return this.renderRoot.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
  }

  private _hasError() {
    return this.error || this._nativeError;
  }

  /** @internal */
  public override [getFormValue](): string | null {
    if (!this.checked || this.indeterminate) return null;

    return this.value;
  }

  /** @internal */
  public override [getFormState](): string {
    return String(this.checked);
  }

  /** @internal */
  public override formResetCallback(): void {
    // The checked property does not reflect, so the original attribute set by
    // the user is used to determine the default value.
    this.checked = this.hasAttribute("checked");
  }

  /** @internal */
  public override formStateRestoreCallback(state: string): void {
    if (state === "on") return;

    this.checked = state === "true";
  }

  /** @internal */
  public override [createValidator](): CheckboxValidator {
    return new CheckboxValidator(() => ({
      checked: this.checked,
      required: this.required,
    }));
  }

  /** @internal */
  public override [onReportValidity](invalidEvent: Event | null): void {
    this._nativeError = !!invalidEvent;
  }

  private _renderIndeterminateIcon() {
    const IndeterminateIconClass = classMap({
      icon: true,
      hidden: !this.indeterminate,
    });

    return html`
      <svg
        class=${IndeterminateIconClass}
        part="indeterminate-icon"
        aria-hidden
        focusable="false"
        width="8"
        height="2"
        viewBox="0 0 8 2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.5 1.75H0.5V0.25H7.5V1.75Z"
          fill="currentColor"
        />
      </svg>
    `;
  }

  private _renderCheckIcon() {
    const checkIconClass = classMap({
      icon: true,
      hidden: !this.checked || this.indeterminate,
    });

    return html`
      <svg
        class=${checkIconClass}
        part="check-icon"
        aria-hidden
        focusable="false"
        width="12"
        height="9"
        viewBox="0 0 12 9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.3333 1.40704L4.07958 8.66667L0.666664 5.37617L2.07919 3.96913L4.07958 5.85258L9.9208 0L11.3333 1.40704Z"
          fill="currentColor"
        />
      </svg>
    `;
  }

  protected override renderTrailingContent() {
    return null;
  }

  protected override renderLeadingContent() {
    return null;
  }

  protected override renderControl(): TemplateResult {
    if (!this.hasValidLabel()) {
      logger(
        "Expected a valid `label` or `labelledby` attribute, received none.",
        "checkbox",
        "error",
      );
    }

    const controlClasses = classMap({
      control: true,
      checked: this.checked,
      indeterminate: this.indeterminate,
      error: this._hasError(),
    });

    return html`
      <div
        class=${controlClasses}
        part="control"
        ?inert=${this.disabled}
      >
        <input
          part="input"
          type="checkbox"
          class="input"
          aria-label=${this.label || nothing}
          aria-labelledby=${this.label ? nothing : this.labelledBy || nothing}
          ?disabled=${this.disabled}
          .indeterminate=${this.indeterminate}
          .checked=${this.checked}
          @input=${this._handleInput}
          @change=${this._handleChange}
          @keydown=${this.handleFormSubmitWithEnter}
        />
        <div
          aria-hidden="true"
          part="box"
          class="box"
        >
          ${this._renderCheckIcon()} ${this._renderIndeterminateIcon()}
        </div>
      </div>
    `;
  }
}
