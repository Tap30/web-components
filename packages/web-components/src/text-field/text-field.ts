import { type PropertyValues, type TemplateResult, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { Input } from "../input";
import { getRenderRootSlot, redispatchEvent, runAfterRepaint } from "../utils";
import { Slots } from "./constants";

export class TextField extends Input {
  @property({ type: String })
  public type:
    | "text"
    | "date"
    | "month"
    | "time"
    | "week"
    | "datetime-local"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "url"
    | "email" = "text";

  @property({ type: Number })
  public max?: number;

  @property({ type: Number })
  public min?: number;

  @property({ type: Number, attribute: "maxlength" })
  public maxLength?: number;

  @property({ type: Number, attribute: "minlength" })
  public minLength?: number;

  @property({ type: String })
  public pattern?: string;

  @property({ type: Number })
  public step?: number;

  @property({ type: String, attribute: "autocomplete" })
  public autoComplete?: HTMLInputElement["autocomplete"];

  @state()
  private _hasTrailingSlot = false;

  @state()
  private _hasLeadingIconSlot = false;

  constructor() {
    super();

    if (this.id) this.inputId = this.id;
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has("id") && this.id) this.inputId = this.id;

    runAfterRepaint(() => {
      const leadingSlot = getRenderRootSlot(
        this.renderRoot,
        Slots.LEADING_ICON,
      );

      const trailingSlot = getRenderRootSlot(this.renderRoot, Slots.TRAILING);

      if (!leadingSlot || !trailingSlot) return;

      this._hasLeadingIconSlot = leadingSlot.assignedNodes().length > 0;
      this._hasTrailingSlot = trailingSlot.assignedNodes().length > 0;
    });
  }

  private _handleChange(event: Event) {
    redispatchEvent(this, event);
  }

  private _handleSelect(event: Event) {
    redispatchEvent(this, event);
  }

  protected renderInput(): TemplateResult {
    const inputClasses = classMap({
      input: true,
      disabled: this.disabled,
    });

    return html`
      <div
        class=${Slots.LEADING_ICON}
        part=${Slots.LEADING_ICON}
        ?hidden=${!this._hasLeadingIconSlot}
      >
        <slot name=${Slots.LEADING_ICON}></slot>
      </div>
      <input
        id=${this.inputId}
        class="${inputClasses}"
        part="input"
        aria-describedby=${this.captionId}
        aria-invalid=${this.error}
        aria-label=${ifDefined(this.label)}
        ?required=${!!this.required}
        ?disabled=${this.disabled}
        ?autofocus=${this.autofocus}
        inputmode=${ifDefined(this.inputMode)}
        placeholder=${ifDefined(this.placeholder)}
        autocomplete=${ifDefined(this.autoComplete)}
        max=${ifDefined(this.min)}
        min=${ifDefined(this.max)}
        maxlength=${ifDefined(this.maxLength)}
        minlength=${ifDefined(this.minLength)}
        pattern=${ifDefined(this.pattern)}
        step=${ifDefined(this.step)}
        type=${this.type}
        .value=${live(this.value)}
        @input=${this.handleInput}
        @change=${this._handleChange}
        @select=${this._handleSelect}
      />
      <div
        class=${Slots.TRAILING}
        part=${Slots.TRAILING}
        ?hidden=${!this._hasTrailingSlot}
      >
        <slot name=${Slots.TRAILING}></slot>
      </div>
    `;
  }
}
