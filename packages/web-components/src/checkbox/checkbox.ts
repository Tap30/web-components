import { LitElement, html, isServer, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import BaseInput from "../base-input";
import {
  createValidator,
  dispatchActivationClick,
  getFormState,
  getFormValue,
  isActivationClick,
  logger,
  onReportValidity,
  redispatchEvent,
  waitAMicrotask,
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

  /**
   * Defines a string value that can be used to name checkbox input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  /**
   * Identifies the element (or elements) that labels the checkbox input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   */
  @property({ type: String })
  public labelledBy = "";

  constructor() {
    super();

    if (!isServer) {
      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
      this.addEventListener("click", async event => {
        if (this.disabled) return;

        // allow event to propagate to user code after a microtask.
        await waitAMicrotask();

        if (event.defaultPrevented) return;

        const input = this.getInputElement();

        if (!isActivationClick(event) || !input) return;

        this.focus();

        dispatchActivationClick(input);
      });
    }
  }

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

  protected override getInputElement() {
    if (!this.renderRoot) return null;

    return this.renderRoot.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
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

  protected override renderLeadingContent() {
    return null;
  }

  protected override renderControl() {
    const hasValidLabel = Boolean(this.label || this.labelledBy);

    if (!hasValidLabel) {
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
