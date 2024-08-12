import { LitElement, PropertyValues, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

export class Switch extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true }) checked = false;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property() value = 'on';

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
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
      this.checked = !this.checked;
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }
  }

  protected updated(changed: PropertyValues) {
    if (changed.has('checked')) {
      const value = this.checked ? this.value : null;
      this.internals.setFormValue(value, String(this.checked));
    }
  }

  formResetCallback() {
    this.checked = false;
  }

  formStateRestoreCallback(state: string) {
    this.checked = state === 'true';
  }

  render() {
    return html`
      <label part="switch" class="switch">
        <input
          role="switch"
          part="input"
          type="checkbox"
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-label=${nothing}
          aria-describedby=${nothing}
          ?disabled=${this.disabled}
          .checked=${this.checked}
        />
        <span part="slider" class="slider"></span>
      </label>
    `;
  }
}
