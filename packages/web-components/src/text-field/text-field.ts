import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { ErrorMessages } from "../base-text-input/constants.ts";
import BaseTextInput, {
  baseTextInputStyles,
} from "../base-text-input/index.ts";
import { createValidator, logger, type Validator } from "../utils/index.ts";
import TextFieldValidator from "./Validator.ts";

/**
 * @summary An input that enables user to type in text information.
 *
 * @tag tapsi-text-field
 *
 * @slot [leading-icon] - the leading icon slot of the text-area
 * @slot [trailing] - the trailing slot of the text-area
 */
export class TextField extends BaseTextInput {
  /** @internal */
  public static override readonly styles = [...baseTextInputStyles];

  /**
   * The `<input>` type to use. The type greatly changes how
   * the text field behaves.
   *
   * Text fields support a limited number of `<input>` types:
   *
   * - text
   * - email
   * - number
   * - password
   * - search
   * - tel
   * - url
   *
   * See
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   * for more details on each input type.
   *
   * @prop {string} type
   * @attr {string} type
   * @default "text"
   */
  @property({ reflect: true })
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
   *
   * @prop {string} max
   * @attr {string} max
   * @default ""
   */
  @property()
  public max = "";

  /**
   * Defines the most negative value in the range of permitted values.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
   *
   * @prop {string} min
   * @attr {string} min
   * @default ""
   */
  @property()
  public min = "";

  /**
   * A regular expression that the text field's value must match to pass
   * constraint validation.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern
   *
   * @prop {string} pattern
   * @attr {string} pattern
   * @default ""
   */
  @property()
  public pattern = "";

  /**
   * Indicates that input accepts multiple email addresses.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#multiple
   *
   * @prop {boolean} multiple
   * @attr {string} multiple
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public multiple = false;

  /**
   * Returns or sets the element's step attribute, which works with min and max
   * to limit the increments at which a numeric or date-time value can be set.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
   *
   * @prop {string} step
   * @attr {string} step
   * @default ""
   */
  @property()
  public step = "";

  /**
   * Hints at the type of data that might be entered by the user while editing
   * the element or its contents. This allows a browser to display an
   * appropriate virtual keyboard.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
   *
   * @prop {string} inputMode
   * @attr {string} inputMode
   * @default ""
   */
  @property()
  public override inputMode = "";

  /**
   * The text field's value as a number.
   *
   * @returns {number}
   */
  public get valueAsNumber() {
    const input = this.getInputElement() as HTMLInputElement | null;

    if (!input) return NaN;

    return input.valueAsNumber;
  }

  public set valueAsNumber(value: number) {
    const input = this.getInputElement() as HTMLInputElement | null;

    if (!input) return;

    input.valueAsNumber = value;
    this.value = input.value;
  }

  /**
   * The text field's value as a Date.
   */
  public get valueAsDate() {
    const input = this.getInputElement() as HTMLInputElement | null;

    if (!input) return null;

    return input.valueAsDate;
  }

  public set valueAsDate(value: Date | null) {
    const input = this.getInputElement() as HTMLInputElement | null;

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
   * @param stepDecrement The number of steps to decrement.
   */
  public stepDown(stepDecrement?: number) {
    const input = this.getInputElement() as HTMLInputElement | null;

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
   * @param stepIncrement The number of steps to increment.
   */
  public stepUp(stepIncrement?: number) {
    const input = this.getInputElement() as HTMLInputElement | null;

    if (!input) return;

    input.stepUp(stepIncrement);
    this.value = input.value;
  }

  /** @internal */
  public override [createValidator](): Validator<unknown> {
    return new TextFieldValidator(() => ({
      state: this,
      control: this.getInputElement() as HTMLInputElement | null,
    }));
  }

  protected override renderInput() {
    if (!this.hasValidLabel()) {
      logger(
        ErrorMessages.SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE,
        "text-field",
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
        dir=${this.dir || nothing}
        aria-invalid=${this.hasError()}
        aria-label=${ariaLabel}
        aria-labelledby=${ariaLabelledBy}
        aria-describedby=${ariaDescribedBy}
        ?required=${!!this.required}
        ?disabled=${this.disabled}
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
