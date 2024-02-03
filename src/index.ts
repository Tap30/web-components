import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "./modal";

@customElement("app-root")
export class AppRoot extends LitElement {
  render() {
    return html`<tap-modal></tap-modal>`;
  }
}
