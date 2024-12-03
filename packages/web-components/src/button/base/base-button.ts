import { html, LitElement, nothing, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../spinner";
import {
  type FormSubmitter,
  type FormSubmitterType,
  setupFormSubmitter,
  withElementInternals,
} from "../../utils";
import { internals } from "../../utils/mixins/with-element-internals";

const BaseClass = withElementInternals(LitElement);

export abstract class BaseButton extends BaseClass implements FormSubmitter {
  static {
    setupFormSubmitter(BaseButton);
  }

  public static formAssociated = true;

  public static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: "open",
  };

  /**
   * Whether the button is disabled.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The type of the button.
   */
  @property()
  public type: FormSubmitterType = "submit";

  /**
   * The accessible label for the button.
   */
  @property()
  public label?: string;

  /**
   * Whether the button is in a loading state.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public loading = false;

  /**
   * The size of the button.
   * @default "md"
   */
  @property()
  public size: "sm" | "md" | "lg" = "md";

  /**
   * The variant style of the button.
   * @default "primary"
   */
  @property()
  public variant:
    | "primary"
    | "ghost"
    | "naked"
    | "elevated"
    | "destructive"
    | "brand" = "primary";

  constructor() {
    super();
  }

  public get form() {
    return this[internals].form;
  }

  /**
   * The method for rendering the content of the button.
   */
  protected abstract renderContent(): TemplateResult;

  /**
   * The method for rendering the loading state of the button.
   */
  protected abstract renderLoading(): TemplateResult;

  /**
   * The method for rendering the spinner for loading state.
   */
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

  private _renderBody() {
    if (this.loading) return this.renderLoading();
    return this.renderContent();
  }

  private _handleClick(e: MouseEvent) {
    if (this.loading || this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
  }

  override focus(options?: FocusOptions) {
    this.renderRoot.querySelector<HTMLElement>("#root")?.focus(options);
  }

  override blur() {
    this.renderRoot.querySelector<HTMLElement>("#root")?.blur();
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      loading: this.loading,
      disabled: this.disabled,
      [this.size]: true,
      [this.variant]: true,
    });

    return html`
      <button
        id="root"
        part="root"
        class=${rootClasses}
        @click=${this._handleClick}
        ?disabled=${this.disabled}
        type=${ifDefined(this.type)}
        aria-label=${ifDefined(this.label)}
        aria-labelledby=${nothing}
        aria-describedby=${nothing}
      >
        <span class="overlay"></span>
        ${this._renderBody()}
      </button>
    `;
  }
}
