import {html, LitElement, PropertyValues} from "lit";
import {property, query} from "lit/decorators.js";
import {classMap} from "lit/directives/class-map.js";
import {englishToPersian, isDeletionKey, isValidDigit, persianToEnglish,} from "./util";
import {ValueChangedEventParams} from "./types";

export class PinInputCell extends LitElement {
    @query('.cell') _cell!: HTMLInputElement;

    @property({type: Boolean, reflect: true}) disabled: boolean = false;

    @property({attribute: 'auto-focus', type: Boolean}) autoFocus: boolean = false;

    @property({reflect: true, type: Boolean, attribute: "has-error"}) hasError =
        false;

    @property({reflect: true, type: String}) value: string = ""!;

    @property() label = "";

    @property() size: "small" | "medium" | "large" = "medium";

    @property({type: Number}) index: number = null!;

    protected updated(changed: PropertyValues) {
        if (changed.has("value") && !Number.isNaN(this.value)) {
            //
        }
    }


    private updateInputValue(newValue: string) {
        this.value = persianToEnglish(newValue);
        (this._cell).value = englishToPersian(newValue);

        if (newValue.length) {
            this.emitValueChanged()
        }

        if (newValue.length === 0) {
            this.emitValueCleared()
        }
    }

    private async emitValueChanged() {
        await this.updateComplete
        const event = new CustomEvent('cell-filled', {
            bubbles: true, composed: false, detail: {
                cell: this,
                index: this.index,
                value: this.value,
            } as ValueChangedEventParams
        })
        this.dispatchEvent(event)
    }

    private async emitValueCleared() {
        await this.updateComplete
        const event = new CustomEvent('cell-cleared', {
            bubbles: true, composed: false, detail: {
                cell: this,
                index: this.index,
                value: this.value,
            } as ValueChangedEventParams
        })
        this.dispatchEvent(event)
    }

    private async emitOverflowedValue(value: string) {
        await this.updateComplete
        const event = new CustomEvent('overflow-value', {
            bubbles: true, composed: false, detail: {
                cell: this,
                index: this.index,
                value: value,
            } as ValueChangedEventParams
        })
        this.dispatchEvent(event)
    }

    private handleInput(event: InputEvent) {
        const inputValue = (event.target as HTMLInputElement).value.replace(/[^\d۰-۹]/g, '');

        if (typeof inputValue === 'string' && inputValue.length >= 1) {
            const lastCharacterIndex = inputValue.length - 1
            this.updateInputValue(inputValue[lastCharacterIndex]);
        } else {
            this.updateInputValue('');
        }
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);

        if (this.autoFocus) {
            this._cell.focus?.()
        }
    }

    private validatePressedKey(event: KeyboardEvent) {
        if (event.key === 'Backspace' && this.value === '') {
            event.preventDefault();
            this.handleEmptyCellBackspace()
            return;
        }

        if (isValidDigit(event.key) || isDeletionKey(event.key)) {
            return true;
        }

        if ([8, 9, 13, 27, 46, 110, 190].includes(event.keyCode) ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (event.keyCode == 65 && (event.ctrlKey === true || event.metaKey === true)) ||
            (event.keyCode == 67 && (event.ctrlKey === true || event.metaKey === true)) ||
            (event.keyCode == 86 && (event.ctrlKey === true || event.metaKey === true)) ||
            (event.keyCode == 88 && (event.ctrlKey === true || event.metaKey === true))) {
            return;
        }

        event.preventDefault();
    }

    private handlePaste(e: ClipboardEvent) {
        const text: string = e.clipboardData?.getData('text/plain') || ''
        if (text && !this.isValidNumericText(text)) {
            e.preventDefault();
        }

        if (text?.length > 1) {
            this.updateInputValue(text[0]);
            this.emitOverflowedValue(text.slice(1))
            e.preventDefault();
            return;
        }
    }

    private isValidNumericText(input: string) {
        if (typeof input === 'string' && input.length > 0) {
            const numericRegex = /^[0-9۰-۹]+$/;
            return numericRegex.test(input)
        }
    }

    private handleEmptyCellBackspace() {
        this.emitValueCleared();
    }

    private handleFocus(e: FocusEvent) {
        const _target = e.target as HTMLInputElement
        if (_target.value?.length > 0) {
            _target.select();
        }
    }

    override focus() {
        if (this._cell) {
            this._cell.focus?.();
        }
    }

    setValue(value: string) {
        if (value.length === 1 && this.value === '') {
            this.updateInputValue(value)
        }
    }

    render() {
        return html`
            <input
                    ?disabled=${this.disabled}
                    role="pin-input-cell"
                    aria-label=${this.label}
                    @input=${this.handleInput}
                    @paste=${this.handlePaste}
                    @focus=${this.handleFocus}
                    @keydown=${this.validatePressedKey}
                    class="cell ${classMap({
                        "cell-sm": this.size === "small",
                        "cell-md": this.size === "medium",
                        "cell-lg": this.size === "large",
                        "has-error": this.hasError,
                    })}"
            />
        `;
    }
}
