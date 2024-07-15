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

const stringTypes = ['text', 'search', 'url', 'tel', 'email', 'password'];

export class TextField extends Input {
  @property({ type: String }) inputmode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';

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

  @property({ type: Number }) maxLength?: number;
  @property({ type: Number }) minLength?: number;

  @property({ type: String }) pattern?: string;

  @property({ type: Number }) step?: number;

  @property({ type: String }) autocomplete?: string; // TODO: add type

  private getAttributeValueByType(
    attribute: Partial<(typeof TextField)[keyof typeof TextField]>,
    allowedTypes: string[],
  ) {
    return attribute && allowedTypes.includes(this.type) ? attribute : nothing;
  }

  // TODO: check if using generic ids for caption and input is ok
  protected renderInput(): TemplateResult {
    return html`
      <slot part="leading" name="leading"></slot>
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
        max=${this.getAttributeValueByType(this.min, numericTypes)}
        min=${this.getAttributeValueByType(this.max, numericTypes)}
        maxlength=${this.getAttributeValueByType(this.maxLength, stringTypes)}
        minlength=${this.getAttributeValueByType(this.minLength, stringTypes)}
        pattern=${this.getAttributeValueByType(this.pattern, stringTypes)}
        step=${this.getAttributeValueByType(this.step, numericTypes)}
        type=${this.type}
        .value=${live(this.value)}
        @input=${this.handleInput}
      />
      <slot part="trailing" name="trailing"></slot>
    `;
  }
}
