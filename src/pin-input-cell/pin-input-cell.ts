import { html, LitElement, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    if (this.autoFocus) {
      this._cell.focus?.();
    }
  }

  override focus() {
    if (this._cell) {
      this._cell.focus?.();
    }
  }

  private handleInputFocus(e: FocusEvent) {
    if (this.value) {
      this._cell.select();
    }
  }

  async setValue(value: string) {
    if (value.length === 1) {
      this.value = value;
      this._cell.value = value;
      await this.updateComplete;
    }
  }

  async clearValue() {
    this.value = '';
    this._cell.value = '';
    await this.updateComplete;
  }

  render() {
    return html`
      <input
        ?disabled=${this.disabled}
        role="text"
        aria-label=${this.label}
        @focus=${(e: FocusEvent) => this.handleInputFocus(e)}
        class="cell ${classMap({
          'cell-sm': this.size === 'small',
          'cell-md': this.size === 'medium',
          'cell-lg': this.size === 'large',
          'has-error': this.hasError,
        })}"
      />
    `;
  }
}
