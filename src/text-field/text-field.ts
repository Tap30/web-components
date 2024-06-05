import { TemplateResult, html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { Input } from '../input/input';

export class TextField extends Input {
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
  render() {
    return html`
      <div part="field" class="field">
        <label part="label" class="label" for="input" ?hidden=${!this.label}
          >${this.label ?? nothing}</label
        >
        <div part="container" class="container">
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
        </div>
        <span
          part="caption"
          class="caption"
          id="caption"
          ?hidden=${!this.caption}
          >${this.caption ?? nothing}</span
        >
      </div>
    `;
  }
}
