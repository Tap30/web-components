import { type TemplateResult, html } from "lit";
import { ifDefined } from "lit/directives/if-defined";
import { live } from "lit/directives/live.js";
import { Input } from "../input";
import { redispatchEvent } from "../utils";

export class Textarea extends Input {
  private _handleChange(event: Event) {
    redispatchEvent(this, event);
  }

  protected renderInput(): TemplateResult {
    return html`
      <textarea
        class="input"
        id="textarea"
        .value=${live(this.value)}
        placeholder=${ifDefined(this.placeholder)}
        ?disabled=${this.disabled}
        aria-label=${ifDefined(this.label)}
        aria-invalid=${this.error}
        aria-disabled=${this.disabled ? "true" : "false"}
        @input=${this.handleInput}
        @change=${this._handleChange}
      >
      </textarea>
    `;
  }
}
