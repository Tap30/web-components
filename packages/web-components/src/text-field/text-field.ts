import { type TemplateResult, html } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { Input } from "../input";
import { redispatchEvent } from "../utils";

export class TextField extends Input {
  @property({ type: String })
  public inputmode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";

  @property({ type: String })
  public type:
    | "text"
    | "date"
    | "month"
    | "time"
    | "week"
    | "datetime-local"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "url"
    | "email" = "text";

  @property({ type: Number })
  public max?: number;

  @property({ type: Number })
  public min?: number;

  @property({ type: Number })
  public maxLength?: number;

  @property({ type: Number })
  public minLength?: number;

  @property({ type: String })
  public pattern?: string;

  @property({ type: Number })
  public step?: number;

  @property({ type: String })
  public autocomplete?: HTMLInputElement["autocomplete"]; // TODO: add type

  private _redispatchEvent(event: Event) {
    redispatchEvent(this, event);
  }

  // TODO: check if using generic ids for caption and input is ok
  protected renderInput(): TemplateResult {
    return html`
      <slot
        part="leading"
        name="leading"
      ></slot>
      <input
        id="input"
        class="input"
        part="input"
        aria-describedby="caption"
        aria-invalid=${this.error}
        aria-label=${ifDefined(this.label)}
        aria-disabled=${this.disabled ? "true" : "false"}
        ?disabled=${this.disabled}
        inputmode=${ifDefined(this.inputmode)}
        placeholder=${ifDefined(this.placeholder)}
        autocomplete=${ifDefined(this.autocomplete)}
        max=${ifDefined(this.min)}
        min=${ifDefined(this.max)}
        maxlength=${ifDefined(this.maxLength)}
        minlength=${ifDefined(this.minLength)}
        pattern=${ifDefined(this.pattern)}
        step=${ifDefined(this.step)}
        type=${this.type}
        .value=${live(this.value)}
        @input=${this.handleInput}
        @change=${this._redispatchEvent}
        @select=${this._redispatchEvent}
      />
      <slot
        part="trailing"
        name="trailing"
      ></slot>
    `;
  }
}
