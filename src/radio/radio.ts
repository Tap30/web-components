import { LitElement, PropertyValues, html, nothing } from "lit";
import { property } from "lit/decorators.js";

export class Radio extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true }) checked = false;

  @property({ type: Boolean })
  disabled = false;

  @property() value = "";

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
    this.dispatchEvent(
      new CustomEvent("radio-input-change", {
        detail: {
          selected: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected updated(changed: PropertyValues) {
    if (changed.has("checked")) {
      const value = this.checked ? this.value : null;
      this.internals.setFormValue(value, String(this.checked));
    }
  }

  formResetCallback() {
    this.checked = false;
  }

  formStateRestoreCallback(state: string) {
    this.checked = state === "true";
  }

  render() {
    return html`
      <input
        id="input"
        type="radio"
        role="radio"
        class="input"
        aria-checked=${this.checked
          ? "true"
          : "false"}
        aria-label=${nothing}
        aria-describedby=${nothing}
        tabindex=${this.disabled ? "-1" : "0"}
        ?disabled=${this.disabled}
        .checked=${this.checked}
        @input=${this.handleInput}
      />
      ${this.renderCheckIcon()}
    `;
  }

  private renderCheckIcon() {
    if (this.checked) {
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
