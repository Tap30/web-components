import { TemplateResult, html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { Input } from '../input/input';
import { TapInput } from '../input';

export class TextField extends TapInput {
  static readonly formAssociated = true;

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
                autocomplete=${ifDefined(this.autocomplete) as any}
                type=${ifDefined(this.type) as any}
                .value=${live(this.value)}
                @input=${this.handleInput}
                />
            <slot name="trailing"></slot>
    `;
  }
}
