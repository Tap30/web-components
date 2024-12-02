import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import BaseTextInput from "../base-text-input";
import { createValidator, logger, type Validator } from "../utils";
import TextFieldValidator from "./Validator";

export class TextField extends BaseTextInput {
  @property({ type: String, reflect: true })
  public type:
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "url" = "text";

  /**
   * Defines the greatest value in the range of permitted values.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
   */
  @property({ type: String })
  public max = "";

  /**
   * Defines the most negative value in the range of permitted values.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
   */
  @property({ type: String })
  public min = "";

  /**
   * A regular expression that the text field's value must match to pass
   * constraint validation.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern
   */
  @property({ type: String })
  public pattern = "";

  /**
   * Indicates that input accepts multiple email addresses.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#multiple
   */
  @property({ type: Boolean, reflect: true })
  public multiple = false;

  /**
   * Returns or sets the element's step attribute, which works with min and max
   * to limit the increments at which a numeric or date-time value can be set.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
   */
  @property({ type: String })
  public step = "";

  /**
   * The label of the text field.
   * - If the `hideLabel` property is true, the label will be hidden visually
   * but still accessible to screen readers.
   * - Otherwise, a visible label element will be rendered.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public override label = "";

  /**
   * The text field's value as a number.
   */
  public get valueAsNumber() {
    const input = this.getInputElement();

    if (!input) return NaN;

    return input.valueAsNumber;
  }

  public set valueAsNumber(value: number) {
    const input = this.getInputElement();

    if (!input) return;

    input.valueAsNumber = value;
    this.value = input.value;
  }

  /**
   * The text field's value as a Date.
   */
  public get valueAsDate() {
    const input = this.getInputElement();

    if (!input) return null;

    return input.valueAsDate;
  }

  public set valueAsDate(value: Date | null) {
    const input = this.getInputElement();

    if (!input) return;

    input.valueAsDate = value;
    this.value = input.value;
  }

  /**
   * Decrements the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
   *
   * @param stepDecrement The number of steps to decrement, defaults to 1.
   */
  public stepDown(stepDecrement?: number) {
    const input = this.getInputElement();

    if (!input) return;

    input.stepDown(stepDecrement);
    this.value = input.value;
  }

  /**
   * Increments the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
   *
   * @param stepIncrement The number of steps to increment, defaults to 1.
   */
  public stepUp(stepIncrement?: number) {
    const input = this.getInputElement();

    if (!input) return;

    input.stepUp(stepIncrement);
    this.value = input.value;
  }

  public override [createValidator](): Validator<unknown> {
    return new TextFieldValidator(() => ({
      state: this,
      control: this.getInputElement(),
    }));
  }

  protected override renderInput() {
    if (!this.hasValidLabel()) {
      logger(
        [
          "Expected a valid `label` or `labelledby` attribute, received none.",
          "If you want to hide the label, provide both `label` and `hidelabel` attributes.",
        ].join(" "),
        "textfield",
        "error",
      );
    }

    const ariaLabel = this.hideLabel ? this.label || nothing : nothing;
    const ariaLabelledBy = this.label ? nothing : this.labelledBy || nothing;
    const ariaDescribedBy = this.supportingText ? "supporting-text" : nothing;

    const maxLength = this.maxLength === -1 ? nothing : this.maxLength;
    const minLength = this.minLength === -1 ? nothing : this.minLength;

    return html`
      <input
        id="input"
        class="input"
        part="input"
        dir=${this.dir}
        aria-invalid=${this.hasError()}
        aria-label=${ariaLabel}
        aria-labelledby=${ariaLabelledBy}
        aria-describedby=${ariaDescribedBy}
        ?required=${!!this.required}
        ?disabled=${this.disabled}
        ?autofocus=${this.autofocus}
        ?readonly=${this.readOnly}
        inputmode=${this.inputMode || nothing}
        placeholder=${this.placeholder || nothing}
        autocomplete=${this.autocomplete || nothing}
        name=${this.name || nothing}
        min=${this.min || nothing}
        max=${this.max || nothing}
        maxlength=${maxLength}
        minlength=${minLength}
        pattern=${this.pattern || nothing}
        step=${this.step || nothing}
        type=${this.type}
        .value=${live(this.value)}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @select=${this.handleSelect}
        @keydown=${this.handleFormSubmitWithEnter}
      />
    `;
  }
}
