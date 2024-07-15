import { TemplateResult, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { Input } from '../input';

const numericTypes = [
  'date',
  'month',
  'week',
  'time',
  'datetime-local',
  'number',
];

export class TextField extends Input {
  @property({ type: String }) inputmode?: string; // TODO: add type

  @property({ type: String }) type:
    | 'text'
    | 'date'
    | 'month'
    | 'time'
    | 'week'
    | 'datetime-local'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'url'
    | 'email' = 'text';

  @property({ type: Number }) max?: number;
  @property({ type: Number }) min?: number;

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
        max=${this.max && numericTypes.includes(this.type) ? this.max : nothing}
        min=${this.min && numericTypes.includes(this.type) ? this.min : nothing}
        type=${this.type}
        .value=${live(this.value)}
        @input=${this.handleInput}
      />
      <slot name="trailing"></slot>
    `;
  }
}
