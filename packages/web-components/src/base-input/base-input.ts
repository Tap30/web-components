import {
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
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
   * Indicates that the user must specify a value for the input before the
   * owning form can be submitted and will render an error state when
   * `reportValidity()` is invoked when value is empty.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Indicates whether or not a user should be able to edit the input's value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
   */
  // @property({ type: Boolean, reflect: true })
  // public readOnly = false;

  @property({ type: String })
  public override inputMode = "";

  /**
   * Gets or sets whether or not the input is in a visually invalid state.
   *
   * This error state overrides the error state controlled by
   * `reportValidity()`.
   */
  // @property({ type: Boolean, reflect: true })
  // public error = false;

  /**
   * The error message that replaces supporting text when `error` is true. If
   * `errorText` is an empty string, then the supporting text will continue to
   * show.
   *
   * This error message overrides the error message displayed by
   * `reportValidity()`.
   */
  // @property({ attribute: "error-text" })
  // public errorText = "";

  /**
   * Whether or not a native error has been reported via `reportValidity()`.
   */
  // @state()
  // private _nativeError = false;

  /**
   * Conveys additional information below the input, such as how it should
   * be used.
   */
  // @property({ type: String, attribute: "supporting-text" })
  // public supportingText = "";

  protected abstract renderTrailingContent(): TemplateResult | null;
  protected abstract renderLeadingContent(): TemplateResult | null;
  protected abstract renderControl(): TemplateResult | null;
  protected abstract getInputElement():
    | HTMLInputElement
    | HTMLTextAreaElement
    | null;

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

  protected override render() {
    const rootClasses = classMap({
      root: true,
      disabled: this.disabled,
    });

    return html`
      <div
        part="root"
        class=${rootClasses}
      >
        ${this.renderLeadingContent()}${this.renderControl()}${this.renderTrailingContent()}
      </div>
    `;
  }
}
