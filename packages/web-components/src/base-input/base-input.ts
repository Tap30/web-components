import {
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import type { DirectiveResult } from "lit/async-directive.js";
import { property, state } from "lit/decorators.js";
import { classMap, type ClassMapDirective } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals";
import {
  getValidityAnchor,
  internals,
  runAfterRepaint,
  withConstraintValidation,
  withElementInternals,
  withFormAssociated,
  withOnReportValidity,
} from "../utils";
import {
  DEFAULT_INPUT_ID,
  DEFAULT_LABEL_ID,
  DEFAULT_SUPPORTING_TEXT_ID,
} from "./constants";

const BaseClass = withOnReportValidity(
  withConstraintValidation(
    withFormAssociated(withElementInternals(LitElement)),
  ),
);

export abstract class BaseInput extends BaseClass {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * The current value of the input. It is always a string.
   */
  @property({ type: String })
  public value = "";

  /**
   * Gets or sets whether or not the input is in a visually invalid state.
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
   * Conveys additional information below the input, such as how it should
   * be used.
   */
  @property({ type: String, attribute: "supporting-text" })
  public supportingText = "";

  /**
   * The label of the input.
   *
   * Displays a bound `label` element when `showLabel` is `true`.
   * Otherwise, sets an `aria-label` attribute.
   */
  @property({ type: String })
  public label = "";

  /**
   * Whether or not the label is visible.
   */
  @property({ type: Boolean, attribute: "show-label" })
  public showLabel = true;

  /**
   * Indicates that the user must specify a value for the input before the
   * owning form can be submitted and will render an error state when
   * `reportValidity()` is invoked when value is empty.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  // /**
  //  * Indicates whether or not a user should be able to edit the input's value.
  //  *
  //  * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
  //  */
  // @property({ type: Boolean, reflect: true })
  // public readOnly = false;

  @property({ type: String })
  public override inputMode = "";

  /**
   * Whether or not a native error has been reported via `reportValidity()`.
   */
  @state()
  private _nativeError = false;

  @state()
  protected inputId = DEFAULT_INPUT_ID;

  protected readonly supportingTextId = DEFAULT_SUPPORTING_TEXT_ID;
  protected readonly labelId = DEFAULT_LABEL_ID;

  constructor() {
    super();

    if (this.id) this.inputId = this.id;
  }

  protected abstract renderInput(): TemplateResult | null;
  protected abstract renderTrailingContent(): TemplateResult | null;
  protected abstract getControlClassMap(): DirectiveResult<
    typeof ClassMapDirective
  >;

  protected getInputElement() {
    if (!this.renderRoot) return null;

    return this.renderRoot.querySelector<HTMLInputElement>(`#${this.inputId}`);
  }

  public override [getValidityAnchor]() {
    return this.getInputElement();
  }

  override focus(options?: FocusOptions): void {
    this.getInputElement()?.focus(options);
  }

  override blur(): void {
    this.getInputElement()?.blur();
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

    if (changed.has("value")) {
      this[internals].setFormValue(this.value);
    }

    if (changed.has("id")) this.inputId = this.id ?? DEFAULT_INPUT_ID;
  }

  public override formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  protected handleInputKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      event.preventDefault();

      return;
    }

    if (event.key === KeyboardKeys.ENTER) {
      if (event.defaultPrevented) return;

      this.form?.requestSubmit();
    }
  }

  private _renderLabel() {
    if (!this.showLabel) return null;
    if (!this.label) return null;

    return html`
      <label
        part="label"
        class="label"
        for=${this.inputId}
      >
        ${this.label}
      </label>
    `;
  }

  private _renderSupportingText() {
    if (!this.supportingText) return null;

    return html`
      <span
        part="supporting-text"
        class="supporting-text"
        id=${this.supportingTextId}
      >
        ${this.supportingText}
      </span>
    `;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      error: !this.disabled && this.error,
      disabled: this.disabled,
    });

    const controlClasses = this.getControlClassMap();

    return html`
      <div
        part="root"
        class=${rootClasses}
      >
        <div
          class="control-wrapper"
          ?inert=${this.disabled}
        >
          ${this._renderLabel()}
          <div
            part="control"
            class=${controlClasses}
          >
            ${this.renderInput()}
          </div>
        </div>
        ${this.renderTrailingContent()}
      </div>
    `;
  }
}
