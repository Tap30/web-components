import { html, LitElement } from "lit";

export class EmptyState extends LitElement {
  render() {
    return html`
      <div class="container">
        <span class="leading">
          <slot name="leading"></slot>
        </span>
        <span class="content">
          <slot name="content"></slot>
        </span>
        <span class="trailing">
          <slot name="trailing"></slot>
        </span>
      </div>
    `
  }
};
