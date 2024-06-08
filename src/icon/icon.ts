import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

export class Icon extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.style.display = 'inline-block';
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    this.style.height = `${this.height}px`;
    this.style.width = `${this.width}px`;
    this.style.color = this.color;
  }

  @property({ reflect: true }) color: string = 'inherit';

  @property({ reflect: true }) width: number = 24;

  @property({ reflect: true }) height: number = 24;

  render() {
    return html` <slot></slot>`;
  }

  renderIcon(content: unknown) {
    return html`
      <tap-icon color=${this.color} width=${this.width} height=${this.height}>
        ${content}
      </tap-icon>
    `;
  }
}
