import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { live } from "lit/directives/live.js";

export class TextArea extends LitElement {
    static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
    };



    @property({ type: String }) value = '';

    @property({ type: String }) placeholder = '';

    @property({ type: String }) label = '';

    @property({ type: String }) caption?: string;

    @property({ type: Boolean }) disabled = false;

    @property({ type: Boolean }) error = false;

    constructor() {
        super();
    }

    private handleInput(event: InputEvent) {
        this.value = (event.target as HTMLTextAreaElement).value;
    }

    render() {
        return html`
        <div part="text-area" class="text-area">
            <label part="label" class="label" for="textarea" ?hidden=${!this.label}>${this.label ?? nothing}</label>
            <div part="container" class="container">
                <textarea
                    class="input"
                    id="textarea"
                    .value=${live(this.value)}
                    placeholder=${this.placeholder}
                    ?disabled=${this.disabled}
                    aria-label=${this.label}
                    aria-invalid=${this.error}
                    aria-disabled=${this.disabled ? "true" : "false"}
                    @input=${this.handleInput}
                >
                </textarea>
            </div>
        </div>
        `;
    }
}