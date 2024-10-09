import { html, LitElement, nothing } from "lit";

export class PinwheelGroup extends LitElement {
  protected override render() {
    return html`
      <div
        role="group"
        class="pinwheel-group"
        part="pinwheel-group"
        aria-label=${nothing}
      >
        <slot></slot>
        <div
          class="selector-indicator"
          part="pinwheel-selector-indicator"
        ></div>
      </div>
    `;
  }
}
