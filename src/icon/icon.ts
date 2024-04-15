import {html, LitElement} from "lit";
import {property} from "lit/decorators.js";

export class Icon extends LitElement {
  @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

  @property({ reflect: true }) color: string = "inherit";

  // TODO: add width and height properties

  render() {
    return html`
        <span id="icon-container" style="color: ${this.color};">
          <slot></slot>
        </span>
    `;
  }

  renderIcon(content: unknown) {
    return html`
      <tap-icon
        size=${this.size}
        color=${this.color}
      >
        ${content}
      </tap-icon>
    `
  }
}
