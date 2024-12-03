import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import BaseTextInput from "../base-text-input";
import { createValidator, logger, type Validator } from "../utils";
import TextAreaValidator from "./Validator";

export class TextArea extends BaseTextInput {
  /**
   * The number of rows to display for the text input.
   * Defaults to 2.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows
   */
  @property({ type: Number })
  public rows = 2;

  /**
   * The number of cols to display for the text input.
   * Defaults to 20.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols
   */
  @property({ type: Number })
  public cols = 20;

  public override [createValidator](): Validator<unknown> {
    return new TextAreaValidator(() => ({
      state: this,
      control: this.getInputElement() as HTMLTextAreaElement | null,
    }));
  }

  protected override renderInput() {
    if (!this.hasValidLabel()) {
      logger(
        [
          "Expected a valid `label` or `labelledby` attribute, received none.",
          "If you want to hide the label, provide both `label` and `hidelabel` attributes.",
        ].join(" "),
        "text-area",
        "error",
      );
    }

    const ariaLabel = this.hideLabel ? this.label || nothing : nothing;
    const ariaLabelledBy = this.label ? nothing : this.labelledBy || nothing;
    const ariaDescribedBy = this.supportingText ? "supporting-text" : nothing;

    const maxLength = this.maxLength === -1 ? nothing : this.maxLength;
    const minLength = this.minLength === -1 ? nothing : this.minLength;

    return html`
      <textarea
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
        cols=${this.cols || nothing}
        rows=${this.rows || nothing}
        inputmode=${this.inputMode || nothing}
        placeholder=${this.placeholder || nothing}
        autocomplete=${this.autocomplete || nothing}
        name=${this.name || nothing}
        maxlength=${maxLength}
        minlength=${minLength}
        .value=${live(this.value)}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @select=${this.handleSelect}
      ></textarea>
    `;
  }
}
