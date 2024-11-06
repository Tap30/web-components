import { type PropertyValues, type TemplateResult, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { Input } from "../input";
import { redispatchEvent } from "../utils";

export class Textarea extends Input {
  @property({ type: Number, attribute: "maxlength" })
  public maxLength?: number;

  @property({ type: Number, attribute: "minlength" })
  public minLength?: number;

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has("id") && this.id) this.inputId = this.id;
  }

  private _handleChange(event: Event) {
    redispatchEvent(this, event);
  }

  protected renderInput(): TemplateResult {
    const inputClasses = classMap({
      input: true,
      disabled: this.disabled,
    });

    return html`
      <textarea
        class="${inputClasses}"
        id=${this.inputId}
        .value=${live(this.value)}
        placeholder=${ifDefined(this.placeholder)}
        ?required=${!!this.required}
        ?disabled=${this.disabled}
        ?autofocus=${this.autofocus}
        aria-describedby=${this.captionId}
        aria-label=${ifDefined(this.label)}
        aria-invalid=${this.error}
        @input=${this.handleInput}
        @change=${this._handleChange}
      >
      </textarea>
    `;
  }
}
