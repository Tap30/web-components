import { LitElement, type PropertyValues, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { redispatchEvent } from "../utils";

export class Radio extends LitElement {
  public static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  public static readonly formAssociated = true;

  @property({ type: Boolean, reflect: true })
  public checked = false;

  @property({ type: Boolean })
  public disabled = false;

  @property()
  public value = "";

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public get form() {
    return this._internals.form;
  }

  public get labels() {
    return this._internals.labels;
  }

  private _handleInput() {
    this.dispatchEvent(
      new CustomEvent("radio-input-change", {
        detail: {
          selected: this.value,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override updated(changed: PropertyValues) {
    if (changed.has("checked")) {
      const value = this.checked ? this.value : null;

      this._internals.setFormValue(value, String(this.checked));
    }
  }

  formResetCallback() {
    this.checked = false;
  }

  formStateRestoreCallback(state: string) {
    this.checked = state === "true";
  }

  private _handleChange(event: Event) {
    redispatchEvent(this, event);
  }

  private _renderCheckIcon() {
    if (!this.checked) return nothing;

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

  protected override render() {
    return html`
      <input
        id="input"
        type="radio"
        role="radio"
        part="radio"
        class="input"
        aria-checked=${this.checked ? "true" : "false"}
        aria-label=${nothing}
        aria-describedby=${nothing}
        tabindex=${this.disabled ? "-1" : "0"}
        ?disabled=${this.disabled}
        .checked=${this.checked}
        @input=${this._handleInput}
        @change=${this._handleChange}
      />
      ${this._renderCheckIcon()}
    `;
  }
}
