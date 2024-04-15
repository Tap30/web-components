import {html, LitElement} from "lit";
import {property} from "lit/decorators.js";

export class Icon extends LitElement {
  @property({reflect: true}) color: string = "inherit";

  @property({reflect: true}) width: number = 24;

  @property({reflect: true}) height: number = 24;

  render() {
    return html`
      <span id="icon-container" style="height: ${this.height}px; width: ${this.width}px; color: ${this.color};">
          <slot></slot>
        </span>
    `;
  }

  renderIcon(content: unknown) {
    return html`
      <tap-icon
        color=${this.color}
        width=${this.width}
        height=${this.height}
      >
        ${content}
      </tap-icon>
    `
  }
}
