import { html, LitElement, nothing, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../spinner";

export abstract class BaseButton extends LitElement {
  public static formAssociated = true;

  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private readonly _internals!: ElementInternals;

  @property({ reflect: true })
  public override slot = "";

  /**
   * Whether the button is disabled.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The type of the button.
   */
  @property({ reflect: true })
  public type?: "button" | "submit" | "reset";

  /**
   * The value associated with the button.
   */
  @property()
  public value?: string;

  /**
   * The name associated with the button.
   */
  @property()
  public name?: string;

  /**
   * The accessible label for the button.
   */
  @property()
  public label?: string;

  /**
   * Whether the button is in a loading state.
   */
  @property({ type: Boolean, reflect: true })
  public loading = false;

  /**
   * The size of the button.
   */
  @property({ reflect: true })
  public size: "sm" | "md" | "lg" = "md";

  /**
   * The variant style of the button.
   */
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

  /**
   * The method for rendering the content of the button.
   * @protected
   */
  protected abstract renderContent(): TemplateResult;

  /**
   * The method for rendering the loading state of the button.
   * @protected
   */
  protected abstract renderLoading(): TemplateResult;

  protected renderSpinner() {
    // TODO: rename the variant names of spinner component
    return html`
      <div class="icon spinner">
        <tap-spinner
          size=${ifDefined(this.size === "sm" ? "small" : undefined)}
        ></tap-spinner>
      </div>
    `;
  }

  private _renderButtonContent() {
    if (this.loading) return this.renderLoading();
    return this.renderContent();
  }

  private _handleClick() {
    if (this.type === "reset") {
      return this._internals.form?.reset();
    }

    if (this.type === "submit") {
      return this._internals.form?.requestSubmit();
    }
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      loading: this.loading,
      [this.size]: true,
      [this.variant]: true,
    });

    return html`
      <button
        id="button"
        class=${rootClasses}
        part="button"
        @click=${this._handleClick}
        ?disabled=${this.disabled}
        type=${ifDefined(this.type)}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        aria-label=${ifDefined(this.label)}
        aria-labelledby=${nothing}
        aria-describedby=${nothing}
      >
        <span class="overlay"></span>
        ${this._renderButtonContent()}
      </button>
    `;
  }
}
