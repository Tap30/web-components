import {
  LitElement,
  type PropertyValues,
  type TemplateResult,
  html,
  nothing,
} from "lit";
import { property } from "lit/decorators.js";

export abstract class Input extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  public static readonly formAssociated = true;

  @property({ type: String })
  public value = "";

  @property({ type: Boolean })
  public disabled = false;

  @property({ type: Boolean })
  public error = false;

  @property({ type: String })
  public caption?: string;

  @property({ type: String })
  public label?: string;

  @property({ type: String })
  public name?: string;

  @property({ type: String })
  public placeholder?: string;

  private _internals: ElementInternals;

  public get form() {
    return this._internals.form;
  }

  public get labels() {
    return this._internals.labels;
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  protected override updated(changed: PropertyValues) {
    if (!changed.has("value")) return;

    this._internals.setFormValue(this.value);
  }

  public formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  public formResetCallback() {
    this.value = "";
  }

  protected handleInput(event: InputEvent) {
    this.value = (event.target as HTMLInputElement).value;
  }

  protected abstract renderInput(): TemplateResult;

  // TODO: check if using generic ids for caption and input is ok
  protected override render() {
    return html`
      <div
        part="field"
        class="field"
      >
        <label
          part="label"
          class="label"
          for="input"
          ?hidden=${!this.label}
        >
          ${this.label ?? nothing}
        </label>
        <div
          part="container"
          class="container"
        >
          ${this.renderInput()}
        </div>
        <span
          part="caption"
          class="caption"
          id="caption"
          ?hidden=${!this.caption}
        >
          ${this.caption ?? nothing}
        </span>
      </div>
    `;
  }
}
