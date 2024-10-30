import { html, LitElement, nothing } from "lit";
import { property, queryAll } from "lit/decorators.js";
import { range } from "lit/directives/range.js";
import { repeat } from "lit/directives/repeat.js";
import "../pin-input-cell";
import {
  type CellArrowKeyPressed,
  type CellCleared,
  type CellClearedAll,
  type CellFilled,
  type CellOverflowValue,
} from "../pin-input-cell/events";
import { type PinInputCell } from "../pin-input-cell/pin-input-cell";
import { withElementInternals, withFormAssociated } from "../utils/index.js";
import { internals } from "../utils/mixins/with-element-internals";
import { getFormValue } from "../utils/mixins/with-form-associated";
import { Filled } from "./events";

const BaseClass = withFormAssociated(withElementInternals(LitElement));

export class PinInput extends BaseClass {
  @queryAll(".pin-input-cell") _cells!: PinInputCell[];

  @property({ type: Boolean, reflect: true }) override disabled: boolean =
    false;

  @property({ type: Boolean, reflect: true, attribute: "has-error" })
  hasError = false;

  @property({ type: Boolean, attribute: "auto-focus" })
  autoFocus: boolean = true;

  @property() description = "";

  @property({ reflect: true, type: Number }) count = 5;

  @property() size: "small" | "medium" | "large" = "medium";

  override connectedCallback(): void {
    super.connectedCallback();
  }

  isFirstCellShouldAutoFocus(index: number) {
    return this.autoFocus && index === 0;
  }

  private handleCellFilled(event: CellFilled) {
    this.focusNextElementByIndex(event.details.index);
    this.handleCellsFilled();
  }

  private handleCellCleared(event: CellCleared) {
    this.focusPrevElementByIndex(event.details.index);
  }

  private handleCellsFilled() {
    if (this.value) {
      this.handleFormValidity(this.value);
      this.emitPinInputFilled();
    }
  }

  private async handleOverflowedCell(event: CellOverflowValue) {
    let overflowedText = event.details.value;
    const cellIndex = event.details.index;
    const isLongerThanRemainingCells =
      overflowedText.length > this.lastCellIndex - cellIndex;

    if (isLongerThanRemainingCells) {
      overflowedText = overflowedText.slice(0, this.lastCellIndex - cellIndex);
    }

    await this.fillCells(overflowedText, cellIndex + 1);
  }

  private async handleClearPrevCells(event: CellClearedAll) {
    await this.updateComplete;
    const currentIndex = event.details.index;

    const isNotFirstItem =
      currentIndex > 0 && this.checkIndexIsInRange(currentIndex);

    if (isNotFirstItem) {
      await this.clearCellsUntil(currentIndex);
      this._cells?.[0]?.focus();
    }
  }

  private async handleArrowKeyPressed(event: CellArrowKeyPressed) {
    await this.updateComplete;
    const currentIndex = event.details.index;

    const shouldPrevItemFocus =
      event.details.value === "left" &&
      this.checkIndexIsInRange(currentIndex) &&
      !this.checkIndexIsFirst(currentIndex);

    const shouldNextItemFocus =
      event.details.value === "right" &&
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

      for (const char of value.split("")) {
        const pos = index + startingAt;

        await this._cells[pos]?.setValue(char);
        index++;
      }
    }
  }

  private emitPinInputFilled() {
    const value = this.value;
    const event = new Filled({
      value,
      cellCount: this.count,
      displayValue: value,
    });

    this.dispatchEvent(event);
  }

  private handleFormValidity(value: string) {
    if (typeof value === "string" && value.length < this.count) {
      this[internals].setValidity(
        { customError: true },
        "Value is less than required",
      );
    } else {
      this[internals].setValidity({});
    }
  }

  get cellValues() {
    return [...this._cells].map(_cell => _cell.value);
  }

  get value() {
    const result = this.cellValues.join("");

    this[internals].setFormValue(result);

    if (result.length === this.count) {
      return result;
    }

    return "";
  }

  override [getFormValue]() {
    return this.value;
  }

  set value(value: string) {
    if (value) {
      void this.fillCells(value);
    }
  }

  override formResetCallback() {
    void (async () => {
      await this.fillCells("");
      this.emitPinInputFilled();
    })();
  }

  override formStateRestoreCallback(state: string) {
    this[internals].setFormValue(state);
  }

  get type() {
    return "pin-input";
  }

  get validity() {
    return this[internals].validity;
  }

  get validationMessage() {
    return this[internals].validationMessage;
  }

  get willValidate() {
    return this[internals].willValidate;
  }

  checkValidity() {
    return this[internals].checkValidity();
  }

  reportValidity() {
    return this[internals].reportValidity();
  }

  private focusNextElementByIndex(current: number) {
    const nextIndex = current + 1;

    if (this.checkIndexIsInRange(current) && !this.checkIndexIsLast(current)) {
      this._cells[nextIndex]?.focus();
    }
  }

  private async clearCellsUntil(index: number) {
    for (let i = 0; i <= index; i++) {
      await this._cells?.[i]?.clearValue();
    }
  }

  private focusPrevElementByIndex(current: number) {
    const nextIndex = current - 1;

    if (this.checkIndexIsInRange(current) && !this.checkIndexIsFirst(current)) {
      this._cells[nextIndex]?.focus();
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
    if (typeof this.title === "string" && this.title.length) {
      return html`
        <div
          part="title"
          class="title"
        >
          ${this.title}
        </div>
      `;
    }

    return nothing;
  }

  private renderInputCells() {
    if (typeof this.title === "string" && this.title.length) {
      return html`
        <div
          class="input-cells"
          part="input-cells"
        >
          ${repeat(
            range(this.count),
            count => count,
            (_, index) => {
              return html` <tap-pin-input-cell
                class="pin-input-cell"
                part="pin-input-cell"
                index=${index}
                ?disabled=${this.disabled}
                ?has-error=${this.hasError}
                @cell-filled=${(e: CellFilled) => this.handleCellFilled(e)}
                @cell-cleared=${(e: CellCleared) => this.handleCellCleared(e)}
                @overflow-value=${(e: CellOverflowValue) =>
                  this.handleOverflowedCell(e)}
                @cell-cleared-all-with-meta-key=${(e: CellClearedAll) =>
                  this.handleClearPrevCells(e)}
                @arrow-key-pressed=${(e: CellArrowKeyPressed) =>
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
    if (typeof this.title === "string" && this.title.length) {
      return html`
        <div
          part="description"
          class="description"
        >
          ${this.description}
        </div>
      `;
    }

    return nothing;
  }

  override render() {
    return html`
      <div
        class="pin-input"
        part="pin-input"
      >
        ${this.renderTitle()} ${this.renderInputCells()}
        ${this.renderDescription()}
      </div>
    `;
  }
}
