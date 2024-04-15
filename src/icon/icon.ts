import {html, LitElement} from "lit";
import {property} from "lit/decorators.js";

export class Icon extends LitElement {
  @property({reflect: true}) size: "small" | "medium" | "large" = "medium";

  @property({reflect: true}) color: string = "inherit";

  @property({reflect: true}) width: number = 24;

  @property({reflect: true}) height: number = 24;

  // TODO: add width and height properties

  render() {
    console.log('🐕 sag width', this.width); // TODO: REMOVE ME ⚠️
    console.log('🐕 sag height', this.height); // TODO: REMOVE ME ⚠️

    return html`
      <span id="icon-container" style="height: ${this.height}px; width: ${this.width}px; color: ${this.color};">
          <slot></slot>
        </span>
    `;
  }

  renderIcon(content: unknown) {
    return html`
      <tap-icon
        size=${this.size}
        color=${this.color}
        width=${this.width}
        height=${this.height}
      >
        ${content}
      </tap-icon>
    `
  }
}
