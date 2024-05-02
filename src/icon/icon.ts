import {html, LitElement, PropertyValues} from "lit";
import {property} from "lit/decorators.js";


export class Icon extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.style.display = 'block';
  }

  protected async updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    this.style.height = `${this.height}px`;
    this.style.width = `${this.width}px`;
    this.style.color = this.color;
  }

  @property({reflect: true}) color: string = "inherit";

  @property({reflect: true}) width: number = 24;

  @property({reflect: true}) height: number = 24;

  @property({reflect: true}) name: string = '';

  render() {
    if (this.name)
      return html`
        <svg
          style="height: ${this.height}px; width: ${this.width}px; fill: ${this.color};"
        >
          <use href="${this.name ? `./assets/${this.name}.svg#${this.name}` : ''}"></use>
        </svg>`;

    return html`
      <slot></slot>`

  }
}
