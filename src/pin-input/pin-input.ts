import { html, LitElement, nothing } from 'lit';
import { property, queryAll } from 'lit/decorators.js';
import { range } from 'lit/directives/range.js';
import { repeat } from 'lit/directives/repeat.js';
import '../pin-input-cell';
import { PinInputCell } from '../pin-input-cell/pin-input-cell';
import {
  PinInputCellArrowKeyPressed,
  PinInputCellCleared,
  PinInputCellClearedAll,
  PinInputCellFilled,
  PinInputCellOverflowValue,
} from '../pin-input-cell/events';
import { PinInputFilled } from './events';

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

  @property({ type: Boolean, attribute: 'auto-focus' })
  autoFocus: boolean = true;

  @property({ reflect: true, type: String }) _value = '';

  @property() label = '';

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

  private handleCellFilled(event: PinInputCellFilled) {
    this.focusNextElementByIndex(event.details.index);
    this.handleCellsFilled();
  }

  private handleCellCleared(event: PinInputCellCleared) {
    this.focusPrevElementByIndex(event.details.index);
  }

  private handleCellsFilled() {
    if (this.inputValue) {
      this.emitPinInputFilled();
    }
  }

  private async handleOverflowedCell(event: PinInputCellOverflowValue) {
    let overflowedText = event.details.value;
    const cellIndex = event.details.index;
    const isLongerThanRemainingCells =
      overflowedText.length > this.lastCellIndex - cellIndex;

    if (isLongerThanRemainingCells) {
      overflowedText = overflowedText.slice(0, this.lastCellIndex - cellIndex);
    }

    await this.fillCells(overflowedText, cellIndex + 1);
  }

  private async handleClearPrevCells(event: PinInputCellClearedAll) {
    await this.updateComplete;
    const currentIndex = event.details.index;

    const isNotFirstItem =
      currentIndex > 0 && this.checkIndexIsInRange(currentIndex);

    if (isNotFirstItem) {
      await this.clearCellsUntil(currentIndex);
      this._cells?.[0].focus();
    }
  }

  private async handleArrowKeyPressed(event: PinInputCellArrowKeyPressed) {
    await this.updateComplete;
    const currentIndex = event.details.index;

    const shouldPrevItemFocus =
      event.details.value === 'left' &&
      this.checkIndexIsInRange(currentIndex) &&
      !this.checkIndexIsFirst(currentIndex);

    const shouldNextItemFocus =
      event.details.value === 'right' &&
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
                @cell-filled=${(e: PinInputCellFilled) =>
                  this.handleCellFilled(e)}
                @cell-cleared=${(e: PinInputCellCleared) =>
                  this.handleCellCleared(e)}
                @overflow-value=${(e: PinInputCellOverflowValue) =>
                  this.handleOverflowedCell(e)}
                @cell-cleared-all-with-meta-key=${(e: PinInputCellClearedAll) =>
                  this.handleClearPrevCells(e)}
                @arrow-key-pressed=${(e: PinInputCellArrowKeyPressed) =>
                  this.handleArrowKeyPressed(e)}
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
