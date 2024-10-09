import { html, LitElement } from "lit";

export class Row extends LitElement {
  protected override render() {
    return html`
      <div
        part="row"
        class="row"
      >
        <slot></slot>
      </div>
    `;
  }
}
