import { LitElement, PropertyValues, TemplateResult, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

export abstract class Input extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static readonly formAssociated = true;

  @property({ type: String })
  value = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean }) error = false;

  @property({ type: String }) caption?: string;

  @property({ type: String }) label?: string;

  @property({ type: String }) name?: string;

  @property({ type: String }) placeholder?: string;

  private internals: ElementInternals;

  get form() {
    return this.internals.form;
  }

  get labels() {
    return this.internals.labels;
  }

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected updated(changed: PropertyValues) {
    if (changed.has('value')) {
      this.internals.setFormValue(this.value);
    }
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.value = '';
  }

  protected handleInput(event: InputEvent) {
    this.value = (event.target as HTMLInputElement).value;
  }

  protected abstract renderInput(): TemplateResult;
  // TODO: check if using generic ids for caption and input is ok
  render() {
    return html`
      <div part="field" class="field">
        <label part="label" class="label" for="input" ?hidden=${!this.label}
          >${this.label ?? nothing}</label
        >
        <div part="container" class="container">${this.renderInput()}</div>
        <span
          part="caption"
          class="caption"
          id="caption"
          ?hidden=${!this.caption}
          >${this.caption ?? nothing}</span
        >
      </div>
    `;
  }
}
