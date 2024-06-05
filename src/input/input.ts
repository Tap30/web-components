import { LitElement, PropertyValues, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';

export class Input extends LitElement {
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

    @property({ type: String }) inputmode?: string; // TODO: add type

    @property({ type: String }) type?: string; // TODO: add type

    @property({ type: String }) autocomplete?: string; // TODO: add type

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

    private handleInput(event: InputEvent) {
        this.value = (event.target as HTMLInputElement).value;
    }

    // TODO: check if using generic ids for caption and input is ok
    render() {
        return html`
      <div part="field" class="field">
        <label part="label" class="label" for="input" ?hidden=${!this.label}
          >${this.label ?? nothing}</label
        >
        <div part="container" class="container">
          <slot name="leading"></slot>
          <input
            id="input"
            class="input"
            part="input"
            aria-describedby="caption"
            aria-invalid=${this.error}
            aria-label=${ifDefined(this.label)}
            aria-disabled=${this.disabled ? 'true' : 'false'}
            ?disabled=${this.disabled}
            inputmode=${ifDefined(this.inputmode)}
            placeholder=${ifDefined(this.placeholder)}
            autocomplete=${ifDefined(this.autocomplete) as any}
            type=${ifDefined(this.type) as any}
            .value=${live(this.value)}
            @input=${this.handleInput}
          />
          <slot name="trailing"></slot>
        </div>
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
