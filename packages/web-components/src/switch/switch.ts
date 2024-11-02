import { LitElement, type PropertyValues, html, nothing } from "lit";
import { property } from "lit/decorators.js";

export class Switch extends LitElement {
  public static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true })
  public checked = false;

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @property()
  public value = "on";

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

  private _handleInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.checked = target.checked;
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (event.key === " ") {
      event.preventDefault();
      this.checked = !this.checked;
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    }
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

  protected override render() {
    return html`
      <label
        part="switch"
        class="switch"
      >
        <input
          role="switch"
          part="input"
          type="checkbox"
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
          aria-checked=${this.checked ? "true" : "false"}
          aria-label=${nothing}
          aria-describedby=${nothing}
          ?disabled=${this.disabled}
          .checked=${this.checked}
        />
        <span
          part="slider"
          class="slider"
        ></span>
      </label>
    `;
  }
}
