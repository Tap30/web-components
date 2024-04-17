import { html, LitElement } from "lit";

export class BadgeWrapper extends LitElement {
  render() {
    return html`
      <span class="wrapper">
        <slot></slot>
        <slot class="badge" name="badge"></slot>
      </span>
    `;
  }
}
