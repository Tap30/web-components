import {
  LitElement,
  type PropertyValues,
  type TemplateResult,
  html,
  nothing,
} from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { redispatchEvent, runAfterRepaint } from "../utils";
import { CAPTION_ID, INPUT_ID } from "./constants";

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

  @property({ type: Boolean })
  public required?: boolean;

  private _internals: ElementInternals;

  public get form() {
    return this._internals.form;
  }

  public get labels() {
    return this._internals.labels;
  }

  @state()
  protected inputId = INPUT_ID;
  protected readonly captionId = CAPTION_ID;

  constructor() {
    super();

    this._internals = this.attachInternals();
  }

  protected override firstUpdated(changed: PropertyValues<this>): void {
    super.firstUpdated(changed);

    runAfterRepaint(() => {
      if (!this.autofocus) return;

      const input = this.renderRoot.querySelector<HTMLInputElement>(
        `#${this.inputId}`,
      );

      if (!input) return;

      input.focus();
    });
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("value")) {
      this._internals.setFormValue(this.value);
    }
  }

  public formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  public formResetCallback() {
    this.value = "";
  }

  protected handleInput(event: InputEvent) {
    this.value = (event.target as HTMLInputElement).value;

    redispatchEvent(this, event);
  }

  protected abstract renderInput(): TemplateResult;

  protected override render() {
    const fieldClasses = classMap({
      field: true,
      error: this.error,
      disabled: this.disabled,
    });

    return html`
      <div
        part="field"
        class="${fieldClasses}"
      >
        <label
          part="label"
          class="label"
          for=${this.inputId}
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
          id=${this.captionId}
          ?hidden=${!this.caption}
        >
          ${this.caption ?? nothing}
        </span>
      </div>
    `;
  }
}
