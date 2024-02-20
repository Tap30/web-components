import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

export class Button extends LitElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static readonly formAssociated = true;

  private readonly internals!: ElementInternals;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ reflect: true }) type?: "button" | "submit" | "reset";

  @property() value?: string;

  @property() name?: string;

  @property() label?: string;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  private handleClick() {
    if (this.type === "reset") {
      return this.internals.form?.reset();
    }

    if (this.type === "submit") {
      return this.internals.form?.requestSubmit();
    }
  }

  render() {
    return html`
      <button
        id="button"
        class="button"
        role="button"
        @click=${this.handleClick}
        ?disabled="${this.disabled}"
        type="${ifDefined(this.type)}"
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        aria-disabled=${this.disabled}
        aria-label="${ifDefined(this.label)}"
        aria-labelledby=${nothing}
        aria-describedby{nothing}
      >
        <slot name="prefix" part="prefix"></slot>
        <slot part="label"></slot>
        <slot name="suffix" part="suffix"></slot>
      </button>
    `;
  }
}
