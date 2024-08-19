import { html, LitElement, nothing } from 'lit';
import { property, queryAll } from 'lit/decorators.js';
import { range } from 'lit/directives/range.js';
import { repeat } from 'lit/directives/repeat.js';
import '../pin-input-cell';
import { PinInputCell } from '../pin-input-cell/pin-input-cell.js';
import { PinInputFilled } from './events.js';
import {
  isArrowKeyPressed,
  isDeletionKeyPressed,
  isDeletionKeyWithCtrlOrMetaPressed,
} from '../pin-input-cell/util.js';
import {
  HandleArrowKeyPressedArgs,
  HandleClearPrevCellsArgs,
  HandleOverflowedCellArgs,
} from './types';

export class PinInput extends LitElement {
  private internals_: ElementInternals;
  static formAssociated = true;

  constructor() {
    super();
    this.internals_ = this.attachInternals();
  }

  @queryAll('.pin-input-cell') _cells!: PinInputCell[];

  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-error' })
  hasError = false;

  @property({ type: Boolean, attribute: 'only-digits' })
  onlyDigits = false;

  @property({ type: Boolean, attribute: 'auto-focus' })
  autoFocus: boolean = true;

  @property({ reflect: true, type: String }) _value = '';

  @property() label = '';
  @property({ reflect: true }) name = '';

  @property() title = '';

  @property() description = '';

  @property({ reflect: true, type: Number }) count = 5;

  @property() size: 'small' | 'medium' | 'large' = 'medium';

  connectedCallback(): void {
    super.connectedCallback();
  }

  isFirstCellShouldAutoFocus(index: number) {
    return this.autoFocus && index === 0;
  }

  private async handleOverflowedCell({
    text,
    index,
  }: HandleOverflowedCellArgs) {
    let overflowedText = text;
    const cellIndex = index;
    const isLongerThanRemainingCells =
      overflowedText.length > this.lastCellIndex - cellIndex;

    if (isLongerThanRemainingCells) {
      overflowedText = overflowedText.slice(0, this.lastCellIndex - cellIndex);
    }

    await this.fillCells(overflowedText, cellIndex + 1);
  }

  private async handleClearPrevCells({ index }: HandleClearPrevCellsArgs) {
    await this.updateComplete;
    const currentIndex = index;

    const isNotFirstItem =
      currentIndex > 0 && this.checkIndexIsInRange(currentIndex);

    if (isNotFirstItem) {
      await this.clearCellsUntil(currentIndex);
      this._cells?.[0].focus();
    }
  }

  private async handleArrowKeyPressed({
    index: currentIndex,
    arrowDirection,
  }: HandleArrowKeyPressedArgs) {
    await this.updateComplete;

    const shouldPrevItemFocus =
      arrowDirection === 'left' &&
      this.checkIndexIsInRange(currentIndex) &&
      !this.checkIndexIsFirst(currentIndex);

    const shouldNextItemFocus =
      arrowDirection === 'right' &&
      this.checkIndexIsInRange(currentIndex) &&
      !this.checkIndexIsLast(currentIndex);

    if (shouldPrevItemFocus) {
      this.focusPrevElementByIndex(currentIndex);
    } else if (shouldNextItemFocus) {
      this.focusNextElementByIndex(currentIndex);
    }
  }

  private async fillCells(value: string, startingAt: number = 0) {
    if (startingAt <= this.lastCellIndex) {
      let index = 0;
      for (const char of value.split('')) {
        const pos = index + startingAt;
        await this._cells[pos].setValue(char);
        index++;
      }

      this._cells[index].focus();
    }
  }

  private emitPinInputFilled() {
    const value = this.inputValue!;
    const event = new PinInputFilled('PinInput Filled.', {
      value: value,
      cellCount: this.count,
      displayValue: value,
    });

    this.dispatchEvent(event);
  }

  private handleFormValidity(value: string) {
    if (typeof value === 'string' && value.length < this.count) {
      this.internals_.setValidity(
        { customError: true },
        'Value is less than required',
      );
    } else {
      this.internals_.setValidity({});
    }
  }

  get cellValues() {
    return [...this._cells].map((_cell) => _cell.value);
  }

  get inputValue() {
    const result = this.cellValues.join('');
    this.internals_.setFormValue(result);
    this._value = result;
    this.handleFormValidity(result);

    if (result.length === this.count) {
      return result;
    }

    return null;
  }

  set value(value: string) {
    if (value) {
      void this.fillCells(value);
    }
  }

  private handleCellsFilled() {
    if (this.inputValue) {
      this.emitPinInputFilled();
    }
  }

  async formResetCallback() {
    await this.fillCells('');
    void this.emitPinInputFilled();
  }

  formStateRestoreCallback(state: string) {
    this.internals_.setFormValue(state);
  }

  get value() {
    return this._value;
  }

  get form() {
    return this.internals_.form;
  }

  get type() {
    return 'pin-input';
  }

  get validity() {
    return this.internals_.validity;
  }

  get validationMessage() {
    return this.internals_.validationMessage;
  }

  get willValidate() {
    return this.internals_.willValidate;
  }

  checkValidity() {
    return this.internals_.checkValidity();
  }

  reportValidity() {
    return this.internals_.reportValidity();
  }

  private focusNextElementByIndex(current: number) {
    const nextIndex = current + 1;
    if (this.checkIndexIsInRange(current) && !this.checkIndexIsLast(current)) {
      this._cells[nextIndex].focus();
    }
  }

  private async clearCellsUntil(index: number) {
    for (let i = 0; i <= index; i++) {
      await this._cells?.[i].clearValue();
    }
  }

  private focusPrevElementByIndex(current: number) {
    const nextIndex = current - 1;
    if (this.checkIndexIsInRange(current) && !this.checkIndexIsFirst(current)) {
      this._cells[nextIndex].focus();
    }
  }

  private checkIndexIsInRange(index: number) {
    return index >= 0 && index < this.count;
  }

  private checkIndexIsLast(index: number) {
    return index === this.count - 1;
  }

  private checkIndexIsFirst(index: number) {
    return index === 0;
  }

  get lastCellIndex() {
    return this.count - 1;
  }

  private renderTitle() {
    if (typeof this.title === 'string' && this.title.length) {
      return html` <div class="title">${this.title}</div> `;
    }
    return nothing;
  }

  private async handleInput(event: InputEvent) {
    const el = event.currentTarget as PinInputCell;
    let inputValue = event.data;
    if (this.onlyDigits) {
      inputValue = event.data?.replace(/[^\d۰-۹]/g, '') ?? '';
    }

    if (typeof inputValue === 'string' && inputValue.length === 1) {
      await el.setValue(inputValue);
      this.focusNextElementByIndex(el.index);
    } else {
      await el.clearValue();
    }

    this.handleCellsFilled();
  }

  private async validatePressedKey(event: KeyboardEvent) {
    const el = event.currentTarget as PinInputCell;

    if (isDeletionKeyWithCtrlOrMetaPressed(event)) {
      event.preventDefault();
      await el.clearValue();
      await this.handleClearPrevCells({ index: el.index });
      event.stopPropagation();
      return;
    }

    if (isDeletionKeyPressed(event.key)) {
      event.preventDefault();
      await el.clearValue();
      this.focusPrevElementByIndex(el.index);
      event.stopPropagation();
      return;
    }

    if (isArrowKeyPressed(event.key)) {
      event.preventDefault();
      await this.handleArrowKeyPressed({
        index: el.index,
        arrowDirection: this.handleArrowDirection(event.key),
      });
      event.stopPropagation();
      return;
    }
  }

  handleArrowDirection(
    eventKey: KeyboardEvent['key'],
  ): 'left' | 'right' | null {
    if (eventKey === 'ArrowLeft') {
      return 'left';
    } else if (eventKey === 'ArrowRight') {
      return 'right';
    }

    return null;
  }

  private async handlePaste(e: ClipboardEvent) {
    const text: string = e.clipboardData?.getData('text/plain') || '';
    const el = e.currentTarget as PinInputCell;

    if (text?.length > 1) {
      await el.setValue(text[0]);
      await this.handleOverflowedCell({ text: text.slice(1), index: el.index });
      e.preventDefault();
      this.handleCellsFilled();
      return;
    }
  }

  private renderInputCells() {
    if (typeof this.title === 'string' && this.title.length) {
      return html`
        <div class="input-cells">
          ${repeat(
            range(this.count),
            (count) => count,
            (_, index) => {
              return html` <tap-pin-input-cell
                class="pin-input-cell"
                index=${index}
                ?disabled=${this.disabled}
                ?has-error=${this.hasError}
                @input=${(e: InputEvent) => this.handleInput(e)}
                @paste=${(e: ClipboardEvent) => this.handlePaste(e)}
                @keydown=${(e: KeyboardEvent) => this.validatePressedKey(e)}
                ?auto-focus=${this.isFirstCellShouldAutoFocus(index)}
                .size=${this.size}
              ></tap-pin-input-cell>`;
            },
          )}
        </div>
      `;
    }
    return nothing;
  }

  private renderDescription() {
    if (typeof this.title === 'string' && this.title.length) {
      return html` <div class="description">${this.description}</div> `;
    }
    return nothing;
  }

  render() {
    return html`
      <div class="pin-input pin-input-wrapper">
        ${this.renderTitle()} ${this.renderInputCells()}
        ${this.renderDescription()}
      </div>
    `;
  }
}
