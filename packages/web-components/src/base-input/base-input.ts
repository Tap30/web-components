import {
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals";
import {
  dispatchActivationClick,
  getValidityAnchor,
  isActivationClick,
  isSSR,
  runAfterRepaint,
  waitAMicrotask,
  withConstraintValidation,
  withElementInternals,
  withFormAssociated,
  withOnReportValidity,
} from "../utils";
import { requestFormSubmit } from "./utils";

const BaseClass = withOnReportValidity(
  withConstraintValidation(
    withFormAssociated(withElementInternals(LitElement)),
  ),
);

export abstract class BaseInput extends BaseClass {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * The current value of the input. It is always a string.
   */
  @property({ type: String })
  public value = "";

  /**
   * Indicates that the user must specify a value for the input before the
   * owning form can be submitted and will render an error state when
   * `reportValidity()` is invoked when value is empty.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Defines a string value that can be used to name input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  /**
   * Identifies the element (or elements) that labels the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   */
  @property({ type: String })
  public labelledBy = "";

  @property({ type: String })
  public override inputMode = "";

  /**
   * The size of the input.
   */
  @property()
  public size: "sm" | "md" = "md";

  constructor() {
    super();

    if (!isSSR()) {
      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
      this.addEventListener("click", async event => {
        if (this.disabled) return;

        // allow event to propagate to user code after a microtask.
        await waitAMicrotask();

        if (event.defaultPrevented) return;

        const input = this.getInputElement();

        if (!isActivationClick(event) || !input) return;

        this.focus();

        dispatchActivationClick(input);
      });
    }
  }

  protected hasValidLabel() {
    return Boolean(this.label || this.labelledBy);
  }

  protected abstract renderTrailingContent(): TemplateResult | null;
  protected abstract renderLeadingContent(): TemplateResult | null;
  protected abstract renderControl(): TemplateResult | null;
  protected abstract getInputElement():
    | HTMLInputElement
    | HTMLTextAreaElement
    | null;

  public override [getValidityAnchor]() {
    return this.getInputElement();
  }

  override focus(options?: FocusOptions): void {
    this.getInputElement()?.focus(options);
  }

  override blur(): void {
    this.getInputElement()?.blur();
  }

  protected override firstUpdated(changed: PropertyValues<this>): void {
    super.firstUpdated(changed);

    runAfterRepaint(() => {
      if (!this.autofocus) return;

      this.focus();
    });
  }

  public override formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  protected async handleFormSubmitWithEnter(event: KeyboardEvent) {
    if (this.disabled) {
      event.preventDefault();

      return;
    }

    if (event.key === KeyboardKeys.ENTER) {
      // allow event to propagate to user code after a microtask.
      await waitAMicrotask();

      if (event.defaultPrevented) return;

      requestFormSubmit(this);
    }
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      disabled: this.disabled,
      [this.size]: true,
    });

    return html`
      <div
        part="root"
        class=${rootClasses}
      >
        ${this.renderLeadingContent()}${this.renderControl()}${this.renderTrailingContent()}
      </div>
    `;
  }
}
