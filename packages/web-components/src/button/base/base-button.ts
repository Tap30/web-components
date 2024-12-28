import "../../spinner";

import {
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
  type FormSubmitter,
  type FormSubmitterType,
  internals,
  isFocusable,
  setupFormSubmitter,
  withElementInternals,
  withFocusable,
} from "../../utils";

const BaseClass = withElementInternals(withFocusable(LitElement));

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
  public type: FormSubmitterType = "button";

  /**
   * The accessible label for the button.
   */
  @property()
  public label: string = "";

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

  public get form() {
    return this[internals].form;
  }

  private _updateFocusability() {
    if (this.disabled) {
      this.removeAttribute("tabindex");
      this[isFocusable] = false;
    } else this[isFocusable] = true;
  }

  public override connectedCallback() {
    super.connectedCallback();

    this._updateFocusability();
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("disabled")) this._updateFocusability();
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
    return html`
      <div class="icon spinner">
        <tapsi-spinner></tapsi-spinner>
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
        tabindex=${this.tabIndex}
        @click=${this._handleClick}
        ?disabled=${this.disabled}
        type=${this.type}
        aria-label=${this.label || nothing}
        aria-busy=${this.loading}
      >
        <span class="overlay"></span>
        ${this._renderBody()}
      </button>
    `;
  }
}
