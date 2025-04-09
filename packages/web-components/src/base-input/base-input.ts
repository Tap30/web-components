import {
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property } from "lit/decorators.js";
import { type ClassInfo, classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals/index.ts";
import {
  dispatchActivationClick,
  getValidityAnchor,
  isActivationClick,
  isSsr,
  runAfterRepaint,
  waitAMicrotask,
  withConstraintValidation,
  withElementInternals,
  withFormAssociated,
  withOnReportValidity,
} from "../utils/index.ts";
import { requestFormSubmit } from "./utils.ts";

const BaseClass = withOnReportValidity(
  withConstraintValidation(
    withFormAssociated(withElementInternals(LitElement)),
  ),
);

export abstract class BaseInput extends BaseClass {
  /** @internal */
  public static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * The current value of the input. It is always a string.
   *
   * @prop {string} value
   * @attr {string} value
   * @default ""
   */
  @property()
  public value = "";

  /**
   * Indicates that the user must specify a value for the input before the
   * owning form can be submitted and will render an error state when
   * `reportValidity()` is invoked when value is empty.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   *
   * @prop {boolean} required
   * @attr {boolean} required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Defines a string value that can be used to name input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   *
   * @prop {string} label
   * @attr {string} label
   * @default ""
   */
  @property()
  public label = "";

  /**
   * Identifies the element (or elements) that labels the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   *
   * @prop {string} labelledBy
   * @attr {string} labelledby
   * @default ""
   */
  @property()
  public labelledBy = "";

  /**
   * Indicates that the element should be focused on page load.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
   *
   * @prop {boolean} autofocus
   * @attr {string} autofocus
   * @default false
   */
  @property({ type: Boolean })
  public override autofocus = false;

  constructor() {
    super();

    if (!isSsr()) {
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

  public override focus(options?: FocusOptions): void {
    this.getInputElement()?.focus(options);
  }

  public override blur(): void {
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

  protected getRootClasses(): ClassInfo {
    return {
      root: true,
      disabled: this.disabled,
    };
  }

  protected override render() {
    const rootClasses = classMap(this.getRootClasses());

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
