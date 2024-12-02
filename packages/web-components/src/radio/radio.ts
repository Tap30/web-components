import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import BaseInput from "../base-input";
import {
  createValidator,
  getFormState,
  getFormValue,
  isFocusable,
  logger,
  onReportValidity,
  redispatchEvent,
  withFocusable,
} from "../utils";
import SingleSelectionController from "./Controller";
import RadioValidator from "./Validator";

export class Radio extends withFocusable(BaseInput) {
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

  public set checked(isChecked: boolean) {
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

  public override connectedCallback() {
    super.connectedCallback();

    this._updateFocusability();
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("disabled")) this._updateFocusability();
  }

  private _updateFocusability() {
    if (this.disabled) {
      this.removeAttribute("tabindex");
      this[isFocusable] = false;
    } else this[isFocusable] = true;
  }

  protected override getInputElement() {
    if (!this.renderRoot) return null;

    return this.renderRoot.querySelector<HTMLInputElement>(
      'input[type="radio"]',
    );
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

  protected override renderLeadingContent() {
    return null;
  }

  protected override renderControl() {
    if (!this.hasValidLabel()) {
      logger(
        "Expected a valid `label` or `labelledby` attribute, received none.",
        "radio",
        "error",
      );
    }

    const controlClasses = classMap({
      control: true,
      checked: this.checked,
    });

    return html`
      <div
        class=${controlClasses}
        part="control"
        ?inert=${this.disabled}
      >
        <input
          type="radio"
          part="input"
          class="input"
          aria-label=${this.label || nothing}
          aria-labelledby=${this.label ? nothing : this.labelledBy || nothing}
          tabindex=${this.tabIndex}
          ?disabled=${this.disabled}
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
          ${this._renderCheckIcon()}
        </div>
      </div>
    `;
  }
}
