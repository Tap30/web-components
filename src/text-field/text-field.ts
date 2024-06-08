import { TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { TapInput } from '../input';

export class TextField extends TapInput {
  @property({ type: String }) inputmode?: string; // TODO: add type

  @property({ type: String }) type?: string; // TODO: add type

  @property({ type: String }) autocomplete?: string; // TODO: add type

  // TODO: check if using generic ids for caption and input is ok
  protected renderInput(): TemplateResult {
    return html`
      <slot name="leading"></slot>
      <input
        id="input"
        class="input"
        part="input"
        aria-describedby="caption"
        aria-invalid=${this.error}
        aria-label=${ifDefined(this.label)}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        ?disabled=${this.disabled}
        inputmode=${ifDefined(this.inputmode)}
        placeholder=${ifDefined(this.placeholder)}
        autocomplete=${ifDefined(this.autocomplete)}
        type=${ifDefined(this.type)}
        .value=${live(this.value)}
        @input=${this.handleInput}
      />
      <slot name="trailing"></slot>
    `;
  }
}
