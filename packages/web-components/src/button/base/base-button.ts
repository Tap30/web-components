import "../../spinner/index.ts";

import {
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
  dispatchActivationClick,
  internals,
  isActivationClick,
  isFocusable,
  runAfterRepaint,
  setupFormSubmitter,
  withElementInternals,
  withFocusable,
  type FormSubmitter,
  type FormSubmitterType,
} from "../../utils/index.ts";

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
   * The URL that the link button points to.
   */
  @property()
  public href = "";

  /**
   * The filename to use when downloading the linked resource.
   * If not specified, the browser will determine a filename.
   * This is only applicable when the button is used as a link (`href` is set).
   */
  @property()
  public download = "";

  /**
   * Where to display the linked `href` URL for a link button. Common options
   * include `_blank` to open in a new tab.
   */
  @property()
  public target: "_blank" | "_parent" | "_self" | "_top" | "" = "";

  /**
   * Indicates that the element should be focused on page load.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
   */
  @property({ type: Boolean })
  public override autofocus = false;

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

  @query("#root")
  private readonly _root!: HTMLElement | null;

  public get form() {
    return this[internals].form;
  }

  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
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

    this.addEventListener("click", this._handleClick);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._handleClick);
  }

  protected override firstUpdated(changed: PropertyValues<this>) {
    super.firstUpdated(changed);

    runAfterRepaint(() => {
      if (!this.autofocus) return;

      this.focus();
    });
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

  private _handleClick(event: MouseEvent) {
    if (this.loading || this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    if (!isActivationClick(event) || !this._root) {
      return;
    }

    this.focus();

    dispatchActivationClick(this._root);
  }

  public override focus(options?: FocusOptions) {
    this._root?.focus(options);
  }

  public override blur() {
    this._root?.blur();
  }

  private _renderAsButton(classes: ReturnType<typeof classMap>) {
    return html`
      <button
        id="root"
        part="root"
        class=${classes}
        tabindex=${this.tabIndex}
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

  private _renderAsLink(classes: ReturnType<typeof classMap>) {
    return html`
      <a
        id="root"
        part="root"
        class=${classes}
        tabindex=${this.tabIndex}
        href=${this.href}
        download=${this.download || nothing}
        target=${this.target || nothing}
        ?disabled=${this.disabled}
        type=${this.type}
        aria-label=${this.label || nothing}
        aria-busy=${this.loading}
      >
        <span class="overlay"></span>
        ${this._renderBody()}
      </a>
    `;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      loading: this.loading,
      disabled: this.disabled,
      [this.size]: true,
      [this.variant]: true,
    });

    const isLink = Boolean(this.href);

    return isLink
      ? this._renderAsLink(rootClasses)
      : this._renderAsButton(rootClasses);
  }
}
