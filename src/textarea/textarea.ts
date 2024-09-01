import { TemplateResult, html } from 'lit';
import { live } from 'lit/directives/live.js';
import { Input } from '../input';
import { redispatchEvent } from '../utils/utils';

export class Textarea extends Input {
  private redispatchEvent(event: Event) {
    redispatchEvent(this, event);
  }

  protected renderInput(): TemplateResult {
    return html`
      <textarea
        class="input"
        id="textarea"
        .value=${live(this.value)}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        aria-invalid=${this.error}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @input=${this.handleInput}
        @change=${this.redispatchEvent}
      >
      </textarea>
    `;
  }
}
