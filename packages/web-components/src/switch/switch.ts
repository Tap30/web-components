import { LitElement, html, isServer, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import BaseInput from "../base-input";
import CheckboxValidator from "../checkbox/Validator";
import { KeyboardKeys } from "../internals";
import {
  createValidator,
  dispatchActivationClick,
  getFormState,
  getFormValue,
  isActivationClick,
  logger,
  onReportValidity,
  redispatchEvent,
} from "../utils";

export class Switch extends BaseInput {
  public static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true,
  };

  /**
   * Whether or not the switch is selected.
   */
  @property({ type: Boolean })
  public selected = false;

  /**
   * The value of the switch that is submitted with a form when selected.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value
   */
  @property()
  public override value = "on";

  /**
   * Defines a string value that can be used to name switch input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  /**
   * Identifies the element (or elements) that labels the switch input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   */
  @property({ type: String })
  public labelledBy = "";

  constructor() {
    super();

    if (isServer) return;

    this.addEventListener("click", (event: MouseEvent) => {
      const input = this.getInputElement();

      if (!isActivationClick(event) || !input) return;

      this.focus();

      dispatchActivationClick(input);
    });
  }

  private _handleInput(event: InputEvent) {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;

    this.selected = target.checked;

    // <input> 'input' event bubbles and is composed, don't re-dispatch it.
  }

  private _handleChange(event: Event) {
    if (this.disabled) return;
    // <input> 'change' event is not composed, re-dispatch it.
    redispatchEvent(this, event);
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      event.preventDefault();

      return;
    }

    if (event.key === KeyboardKeys.ENTER) {
      if (event.defaultPrevented) return;

      this.getInputElement()?.click();
    }
  }

  public override [getFormValue]() {
    if (!this.selected) return null;

    return this.value;
  }

  public override [getFormState]() {
    return String(this.selected);
  }

  public override formResetCallback() {
    // The selected property does not reflect, so the original attribute set by
    // the user is used to determine the default value.
    this.selected = this.hasAttribute("selected");
  }

  public override formStateRestoreCallback(state: string) {
    if (state === "on") return;

    this.selected = state === "true";
  }

  public override [createValidator]() {
    return new CheckboxValidator(() => ({
      checked: this.selected,
      required: this.required,
    }));
  }

  public override [onReportValidity]() {
    // Perform the default behavior (showing pop-up)
  }

  protected override getInputElement() {
    if (!this.renderRoot) return null;

    return this.renderRoot.querySelector<HTMLInputElement>(
      'input[role="switch"]',
    );
  }

  private _renderCheckIcon() {
    if (!this.selected) return null;

    return html`
      <svg
        focusable="false"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 8.11057L9.11938 19L4 14.0643L6.11879 11.9537L9.11938 14.7789L17.8812 6L20 8.11057Z"
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
        "switch",
        "error",
      );
    }

    const controlClasses = classMap({
      control: true,
      selected: this.selected,
    });

    return html`
      <div
        class=${controlClasses}
        part="control"
        ?inert=${this.disabled}
      >
        <input
          role="switch"
          part="input"
          type="checkbox"
          class="input"
          aria-label=${this.label || nothing}
          aria-labelledby=${this.label ? nothing : this.labelledBy || nothing}
          ?disabled=${this.disabled}
          .checked=${this.selected}
          @keydown=${this._handleKeyDown}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        <div
          aria-hidden="true"
          part="track"
          class="track"
        ></div>
        <div
          aria-hidden="true"
          part="knob"
          class="knob"
        >
          ${this._renderCheckIcon()}
        </div>
      </div>
    `;
  }
}
