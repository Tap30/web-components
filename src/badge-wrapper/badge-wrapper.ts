import { html, LitElement } from "lit";

export class BadgeWrapper extends LitElement {
  protected override render() {
    return html`
      <span
        class="wrapper"
        part="wrapper"
      >
        <slot></slot>
        <slot
          class="badge"
          name="badge"
          part="badge"
        ></slot>
      </span>
    `;
  }
}
