import { html, LitElement, nothing } from 'lit';
import { property, queryAll } from 'lit/decorators.js';
import { range } from 'lit/directives/range.js';
import { repeat } from 'lit/directives/repeat.js';
import '../pin-input-cell';
import { PinInputCell } from '../pin-input-cell/pin-input-cell';
import { englishToPersian } from '../pin-input-cell/util';
import { InputFilledEventParams } from './types';
import { ValueChangedEventParams } from '../pin-input-cell/types';

export class PinInput extends LitElement {
  @queryAll('.pin-input-cell') _cells!: PinInputCell[];

  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-error' })
  hasError = false;

  @property({ type: Boolean, attribute: 'auto-focus-first-cell' })
  autoFocusFirstCell: boolean = true;

  @property({ reflect: true, type: Number }) value = null;

  @property() label = '';

  @property({ reflect: true }) title = '';

  @property({ reflect: true }) description = '';

  @property({ reflect: true, type: Number }) count = 5;

  @property() size: 'small' | 'medium' | 'large' = 'medium';

  connectedCallback(): void {
    super.connectedCallback();
  }

  isFirstCellShouldAutoFocus(index: number) {
    return this.autoFocusFirstCell && index === 0;
  }

  private handleCellFilled(event: CustomEvent<ValueChangedEventParams>) {
    this.focusNextElementByIndex(event.detail.index);
    this.handleCellsFilled();
  }

  private handleCellCleared(event: CustomEvent<ValueChangedEventParams>) {
    this.focusPrevElementByIndex(event.detail.index);
  }

  private handleCellsFilled() {
    if (this.inputValue) {
      this.emitPinInputFilled();
    }
  }

  private async handleOverflowedCell(
    event: CustomEvent<ValueChangedEventParams>,
  ) {
    let overflowedText = event.detail.value;
    const cellIndex = event.detail.index;
    const isLongerThanRemainingCells =
      overflowedText.length > this.lastCellIndex - cellIndex;

    if (isLongerThanRemainingCells) {
      overflowedText = overflowedText.slice(0, this.lastCellIndex - cellIndex);
    }

    await this.fillCells(overflowedText, cellIndex + 1);
  }

  private async fillCells(value: string, startingAt: number = 0) {
    if (startingAt <= this.lastCellIndex) {
      let index = 0;
      for (const char of value.split('')) {
        const pos = index + startingAt;
        await this._cells[pos].setValue(char);
        await this._cells[pos].updateComplete;
        index++;
      }
    }
  }

  private emitPinInputFilled() {
    const event = new CustomEvent('filled', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.inputValue,
        cellCount: this.count,
        displayValue: englishToPersian(this.inputValue!),
      } as InputFilledEventParams,
    });

    this.dispatchEvent(event);
  }

  get cellValues() {
    return [...this._cells].map((_cell) => _cell.value);
  }

  get inputValue() {
    const result = this.cellValues.join('');
    if (result.length === this.count) {
      return result;
    }

    return null;
  }

  private focusNextElementByIndex(current: number) {
    const nextIndex = current + 1;
    if (this.checkIndexIsInRange(current) && !this.checkIndexIsLast(current)) {
      this._cells[nextIndex].focus();
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
                @cell-filled=${(e: CustomEvent<ValueChangedEventParams>) =>
                  this.handleCellFilled(e)}
                @cell-cleared=${(e: CustomEvent<ValueChangedEventParams>) =>
                  this.handleCellCleared(e)}
                @overflow-value=${(e: CustomEvent<ValueChangedEventParams>) =>
                  this.handleOverflowedCell(e)}
                ?auto-focus=${this.isFirstCellShouldAutoFocus(index)}
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
