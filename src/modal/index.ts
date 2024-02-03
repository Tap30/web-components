import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("tap-modal")
export class TapModal extends LitElement {
  render() {
    return html`<p>TapModal</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-modal": TapModal;
  }
}
