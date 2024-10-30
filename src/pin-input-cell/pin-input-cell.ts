import { html, LitElement, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import {
  isArrowKeyPressed,
  isDeletionKeyPressed,
  isDeletionKeyWithCtrlOrMetaPressed,
  isValidDigit,
  persianToEnglish,
} from './util';
import {
  CellArrowKeyPressed,
  CellCleared,
  CellClearedAll,
  CellFilled,
  CellOverflowValue,
} from './events';

export class PinInputCell extends LitElement {
  @query('.cell') _cell!: HTMLInputElement;

  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  @property({ attribute: 'auto-focus', type: Boolean }) autoFocus: boolean =
    false;

  @property({ reflect: true, type: Boolean, attribute: 'has-error' }) hasError =
    false;

  @property({ reflect: true, type: String }) value: string = '';

  @property() label = '';

  @property() size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Number }) index: number = null!;

  protected override updated(changed: PropertyValues) {
    if (changed.has('value') && !Number.isNaN(this.value)) {
      //
    }
  }

  private async updateInputValue(newValue: string) {
    this.value = persianToEnglish(newValue);
    this._cell.value = newValue;

    if (newValue.length) {
      await this.emitValueChanged();
    }

    if (newValue.length === 0) {
      await this.emitValueCleared();
    }
  }

  private async emitValueChanged() {
    await this.updateComplete;
    const event = new CellFilled({
      cell: this,
      index: this.index,
      value: this.value,
    });

    this.dispatchEvent(event);
  }

  private async emitValueCleared() {
    await this.updateComplete;
    const event = new CellCleared({
      cell: this,
      index: this.index,
      value: this.value,
    });

    this.dispatchEvent(event);
  }

  private async emitDeletionWithMetaKeys() {
    await this.updateComplete;
    const event = new CellClearedAll({
      cell: this,
      index: this.index,
      value: this.value,
    });

    this.dispatchEvent(event);
  }

  private async emitArrowKeyPressed(key: 'ArrowLeft' | 'ArrowRight') {
    await this.updateComplete;

    const event = new CellArrowKeyPressed(
      {
        cell: this,
        index: this.index,
        value: key === 'ArrowLeft' ? 'left' : 'right',
      },
    );

    this.dispatchEvent(event);
  }

  private async emitOverflowedValue(value: string) {
    await this.updateComplete;
    const event = new CellOverflowValue({
        cell: this,
        index: this.index,
        value: value,
      },
    );

    this.dispatchEvent(event);
  }

  private async handleInput(event: InputEvent) {
    const inputValue = (event.target as HTMLInputElement).value.replace(
      /[^\d۰-۹]/g,
      '',
    );

    if (typeof inputValue === 'string' && inputValue.length >= 1) {
      const lastCharacterIndex = inputValue.length - 1;
      if( inputValue[lastCharacterIndex]){
      await this.updateInputValue(inputValue[lastCharacterIndex]);
      }
    } else {
      await this.updateInputValue('');
    }
  }

  protected override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    if (this.autoFocus) {
      this._cell.focus?.();
    }
  }

  private async validatePressedKey(event: KeyboardEvent) {
    if (
      isDeletionKeyWithCtrlOrMetaPressed({
        input: event.key,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
      })
    ) {
      this.value = '';
      event.preventDefault();
      await this.handleDeletionWithMetaKeys();
      return;
    }

    if (isDeletionKeyPressed(event.key) && this.value === '') {
      this.value = '';
      event.preventDefault();
      await this.handleEmptyCellBackspace();
      return;
    }

    if (isArrowKeyPressed(event.key)) {
      event.preventDefault();
      await this.handleArrowKeyPressed(event.key);
      return;
    }

    if (isValidDigit(event.key) || isDeletionKeyPressed(event.key)) {
      return true;
    }

    if (
      [8, 9, 13, 27, 46, 110, 190].includes(event.keyCode) ||
      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (event.keyCode == 65 &&
        (event.ctrlKey === true || event.metaKey === true)) ||
      (event.keyCode == 67 &&
        (event.ctrlKey === true || event.metaKey === true)) ||
      (event.keyCode == 86 &&
        (event.ctrlKey === true || event.metaKey === true)) ||
      (event.keyCode == 88 &&
        (event.ctrlKey === true || event.metaKey === true))
    ) {
      return;
    }

    event.preventDefault();
  }

  private async handlePaste(e: ClipboardEvent) {
    const text: string = e.clipboardData?.getData('text/plain') || '';
    if (text && !this.isValidNumericText(text)) {
      e.preventDefault();
    }

    if (text?.length > 1 && text[0]) {
      await this.updateInputValue(text[0]);
      await this.emitOverflowedValue(text.slice(1));
      e.preventDefault();
      return;
    }
  }

  private isValidNumericText(input: string) {
    if (typeof input === 'string' && input.length > 0) {
      const numericRegex = /^[0-9۰-۹]+$/;
      return numericRegex.test(input);
    }
  }

  private async handleEmptyCellBackspace() {
    await this.emitValueCleared();
  }

  private async handleDeletionWithMetaKeys() {
    await this.emitDeletionWithMetaKeys();
  }

  private async handleArrowKeyPressed(key: 'ArrowLeft' | 'ArrowRight') {
    await this.emitArrowKeyPressed(key);
  }

  private handleFocus(e: FocusEvent) {
    const _target = e.target as HTMLInputElement;
    if (_target.value?.length > 0) {
      _target.select();
    }
  }

  override focus() {
    if (this._cell) {
      this._cell.focus?.();
    }
  }

  async setValue(value: string) {
    if (value.length === 1 && this.value === '') {
      await this.updateInputValue(value);
      await this.updateComplete;
    }
  }

  async clearValue() {
    await this.updateInputValue('');
    await this.updateComplete;
  }

  override render() {
    return html`
      <input
        ?disabled=${this.disabled}
        aria-label=${this.label}
        @input=${(e: InputEvent) => this.handleInput(e)}
        @paste=${(e: ClipboardEvent) => this.handlePaste(e)}
        @focus=${(e: FocusEvent) => this.handleFocus(e)}
        @keydown=${(e: KeyboardEvent) => this.validatePressedKey(e)}
        part="pin-input-cell"
        class="pin-input-cell cell ${classMap({
          'cell-sm': this.size === 'small',
          'cell-md': this.size === 'medium',
          'cell-lg': this.size === 'large',
          'has-error': this.hasError,
        })}"
      />
    `;
  }
}
