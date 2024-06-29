import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../spinner';

export abstract class BaseButton extends LitElement {
  static formAssociated = true;
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private readonly internals!: ElementInternals;

  @property({ reflect: true }) slot = '';

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ reflect: true }) type?: 'button' | 'submit' | 'reset';

  @property() value?: string;

  @property() name?: string;

  @property() label?: string;

  @property({ type: Boolean, reflect: true }) loading = false;

  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  @property({ reflect: true }) variant:
    | 'primary'
    | 'ghost'
    | 'naked'
    | 'elevated'
    | 'destructive'
    | 'brand' = 'primary';

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  render() {
    return html`
      <button
        id="button"
        class="button"
        role="button"
        part="button"
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        type=${ifDefined(this.type)}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        aria-label=${ifDefined(this.label)}
        aria-disabled=${this.disabled}
        aria-labelledby=${nothing}
        aria-describedby=${nothing}
      >
        <span class="cover"></span>
        ${this.loading ? this.renderLoadingContent() : html` <slot></slot>`}
      </button>
    `;
  }

  private renderLoadingContent = () => {
    return html `
      <div class="spinner">
        <tap-spinner></tap-spinner>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }

  private handleClick = () => {
    if (this.type === 'reset') {
      return this.internals.form?.reset();
    }

    if (this.type === 'submit') {
      return this.internals.form?.requestSubmit();
    }
  };
}
