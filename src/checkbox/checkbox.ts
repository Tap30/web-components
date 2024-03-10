import { LitElement, PropertyValues, html, nothing } from "lit";
import { property } from "lit/decorators.js";

export class Checkbox extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true }) checked = false;

  @property({ type: Boolean, reflect: true }) indeterminate = false;

  @property({ type: Boolean })
  disabled = false;

  @property() value = "on";

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  get form() {
    return this.internals.form;
  }

  get labels() {
    return this.internals.labels;
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = target.indeterminate;
  }

  protected updated(changed: PropertyValues) {
    if (changed.has("checked")) {
      const value = this.checked && !this.indeterminate ? this.value : null;
      this.internals.setFormValue(value, String(this.checked));
    }
  }

  formResetCallback() {
    this.checked = false; // TODO: maybe add default checked
  }

  formStateRestoreCallback(state: string) {
    this.checked = state === "true";
  }

  render() {
    return html`
      <input
        id="input"
        type="checkbox"
        class="input"
        aria-checked=${this.indeterminate
          ? "mixed"
          : this.checked
          ? "true"
          : "false"}
        aria-label=${nothing}
        aria-describedby=${nothing}
        ?disabled=${this.disabled}
        .indeterminate=${this.indeterminate}
        .checked=${this.checked}
        @input=${this.handleInput}
      />
      ${this.renderCheckIcon()}
      ${this.renderIndeterminateIcon()}
    `;
  }

  private renderIndeterminateIcon() {
    if (this.indeterminate) {
      return html`
        <svg
          width="8"
          height="2"
          viewBox="0 0 8 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 1.75H0.5V0.25H7.5V1.75Z"
            fill="currentColor"
          />
        </svg>
      `;
    }
  }

  private renderCheckIcon() {
    if (this.checked && !this.indeterminate) {
      return html` <svg
        ?hidden=${!this.checked}
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.3333 1.40704L4.07958 8.66667L0.666664 5.37617L2.07919 3.96913L4.07958 5.85258L9.9208 0L11.3333 1.40704Z"
          fill="currentColor"
        />
      </svg>`;
    }
  }
}
