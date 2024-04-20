import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { TemplateResult } from "lit-html";

export class Button extends LitElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static readonly formAssociated = true;

  private readonly internals!: ElementInternals;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ reflect: true }) type?: "button" | "submit" | "reset";

  @property({ reflect: true }) shape?: "pill" | "circle" = "pill";

  @property() value?: string;

  @property() name?: string;

  @property() label?: string;

  @property({ type: Boolean, reflect: true }) loading = false;

  @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

  @property({ reflect: true }) variant:
    | "primary"
    | "ghost"
    | "naked"
    | "elevated"
    | "destructive"
    | "brand" = "primary";

  @property({ reflect: true }) icon?: TemplateResult;

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
        part="button"
        @click=${this.handleClick}
        ?disabled="${this.disabled}"
        type="${ifDefined(this.type)}"
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        aria-label="${ifDefined(this.label)}"
        aria-disabled=${this.disabled}
        aria-labelledby=${nothing}
        aria-describedby=${nothing}
      >
        ${this.icon ? html`<i class="icon">${this.icon}</i>` : nothing}
        <span class="cover"></span>
        <!-- TODO: add spinner -->
        ${this.loading ? html`<span>loading</span>` : html`<slot></slot>`}
      </button>
    `;
  }
}
