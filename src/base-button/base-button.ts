import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../spinner";

export abstract class BaseButton extends LitElement {
  public static formAssociated = true;

  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private readonly _internals!: ElementInternals;

  @property({ reflect: true })
  public override slot = "";

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @property({ reflect: true })
  public type?: "button" | "submit" | "reset";

  @property()
  public value?: string;

  @property()
  public name?: string;

  @property()
  public label?: string;

  @property({ type: Boolean, reflect: true })
  public loading = false;

  @property({ reflect: true })
  public size: "small" | "medium" | "large" = "medium";

  @property({ reflect: true })
  public variant:
    | "primary"
    | "ghost"
    | "naked"
    | "elevated"
    | "destructive"
    | "brand" = "primary";

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  private _renderLoadingContent = () => {
    return html`
      <div class="spinner">
        <tap-spinner
          size=${ifDefined(this.size === "small" ? "small" : undefined)}
        ></tap-spinner>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  };

  private _handleClick = () => {
    if (this.type === "reset") {
      return this._internals.form?.reset();
    }

    if (this.type === "submit") {
      return this._internals.form?.requestSubmit();
    }
  };

  protected override render() {
    return html`
      <button
        id="button"
        class="button"
        role="button"
        part="button"
        @click=${this._handleClick}
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
        ${this.loading ? this._renderLoadingContent() : html` <slot></slot>`}
      </button>
    `;
  }
}
