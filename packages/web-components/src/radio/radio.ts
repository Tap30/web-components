import { html, LitElement, nothing } from "lit";
import type { DirectiveResult } from "lit/async-directive.js";
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
import SingleSelectionController from "./Controller";
import RadioValidator from "./Validator";

export class Radio extends BaseInput {
  public static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _checked = false;

  /**
   * Whether or not the radio is selected.
   */
  @property({ type: Boolean })
  public get checked() {
    return this._checked;
  }

  set checked(isChecked: boolean) {
    const prevChecked = this.checked;

    if (prevChecked === isChecked) return;

    this._checked = isChecked;
    this.requestUpdate("checked", prevChecked);
    this._controller.handleCheckedChange();
  }

  /**
   * The value of the radio that is submitted with a form when selected.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#value
   */
  @property()
  public override value = "on";

  private readonly _controller = new SingleSelectionController(this);

  constructor() {
    super();

    this.addController(this._controller);
  }

  private _handleInput(event: Event) {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;

    this.checked = target.checked;

    // <input> 'input' event bubbles and is composed, don't re-dispatch it.
  }

  private _handleChange(event: Event) {
    if (this.disabled) return;
    // <input> 'change' event is not composed, re-dispatch it.
    redispatchEvent(this, event);
  }

  public override [getFormValue]() {
    if (!this.checked) return null;

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
    return new RadioValidator(() => {
      // Validation runs on superclass construction, so selection controller
      // might not actually be ready until this class constructs.
      if (!this._controller) {
        return [
          {
            checked: this.checked,
            required: this.required,
          },
        ];
      }

      return this._controller.controls as [Radio, ...Radio[]];
    });
  }

  public override [onReportValidity]() {
    // Perform the default behavior (showing pop-up)
  }

  private _renderCheckIcon() {
    if (!this.checked) return null;

    return html`
      <svg
        aria-hidden
        focusable="false"
        part="check-icon"
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
    });
  }

  protected override renderInput() {
    const tabIndex = this.disabled ? -1 : (this.tabIndex ?? 0);

    return html`
      <input
        id=${this.inputId}
        type="radio"
        part="input"
        class="input"
        aria-label=${this.showLabel ? nothing : this.label}
        aria-invalid=${this.error}
        tabindex=${tabIndex}
        ?disabled=${this.disabled}
        .checked=${this.checked}
        @keydown=${this.handleInputKeyDown}
        @input=${this._handleInput}
        @change=${this._handleChange}
      />
      ${this._renderCheckIcon()}
    `;
  }
}
