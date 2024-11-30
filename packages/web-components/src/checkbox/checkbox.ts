import { LitElement, html, nothing } from "lit";
import type { DirectiveResult } from "lit/async-directive";
import { property } from "lit/decorators.js";
import { classMap, type ClassMapDirective } from "lit/directives/class-map.js";
import BaseInput from "../base-input";
import {
  createValidator,
  getFormState,
  getFormValue,
  onReportValidity,
  redispatchEvent,
} from "../utils";
import CheckboxValidator from "./Validator";

export class Checkbox extends BaseInput {
  public static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Whether or not the checkbox is selected.
   */
  @property({ type: Boolean })
  public checked = false;

  /**
   * Whether or not the checkbox is indeterminate.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
   */
  @property({ type: Boolean })
  public indeterminate = false;

  /**
   * The value of the checkbox that is submitted with a form when selected.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value
   */
  @property()
  public override value = "on";

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

  public override [getFormValue]() {
    if (!this.checked || this.indeterminate) return null;

    return this.value;
  }

  public override [getFormState]() {
    return String(this.checked);
  }

  public override formResetCallback() {
    // The checked property does not reflect, so the original attribute set by
    // the user is used to determine the default value.
    this.checked = this.hasAttribute("checked");
  }

  public override formStateRestoreCallback(state: string) {
    if (state === "on") return;

    this.checked = state === "true";
  }

  public override [createValidator]() {
    return new CheckboxValidator(() => ({
      checked: this.checked,
      required: this.required,
    }));
  }

  public override [onReportValidity]() {
    // Perform the default behavior (showing pop-up)
  }

  private _renderIndeterminateIcon() {
    if (!this.indeterminate) return null;

    return html`
      <svg
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
    if (!this.checked || this.indeterminate) return null;

    return html`
      <svg
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

  protected override getControlClassMap(): DirectiveResult<
    typeof ClassMapDirective
  > {
    return classMap({
      control: true,
      checked: this.checked,
      indeterminate: this.indeterminate,
    });
  }

  protected override renderInput() {
    return html`
      <input
        id=${this.inputId}
        part="input"
        type="checkbox"
        class="input"
        aria-checked=${this.indeterminate ? "mixed" : nothing}
        aria-label=${this.showLabel ? nothing : this.label}
        aria-invalid=${this.error}
        ?disabled=${this.disabled}
        .indeterminate=${this.indeterminate}
        .checked=${this.checked}
        @keydown=${this.handleInputKeyDown}
        @input=${this._handleInput}
        @change=${this._handleChange}
      />
      ${this._renderCheckIcon()} ${this._renderIndeterminateIcon()}
    `;
  }
}
