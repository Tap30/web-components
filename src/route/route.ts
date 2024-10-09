import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { TapRow } from "../row";

export class Route extends TapRow {
  @property({ reflect: true, attribute: "leading-icon" })
  public leadingIcon: "circle" | "square" | "plus" = "circle";

  @property({ reflect: true })
  public ordinal: "first" | "middle" | "last" = "first";

  @property({ type: Boolean, reflect: true })
  public editable: boolean = false;

  private _renderLeadingIcon() {
    switch (this.leadingIcon) {
      case "circle":
        return html`<tap-icon-dot-fill></tap-icon-dot-fill>`;
      case "square":
        return html`<tap-icon-square-fill></tap-icon-square-fill>`;
      case "plus":
        return html`<tap-icon-plus-fill></tap-icon-plus-fill>`;
      default:
        return nothing;
    }
  }

  private _renderAction() {
    if (!this.editable) return nothing;

    return html`
      <tap-icon-pencil-line-fill
        class="edit-btn"
        slot="trailing"
      ></tap-icon-pencil-line-fill>
    `;
  }

  protected override render() {
    return html`
      <tap-row
        size=${this.size}
        ?disabled=${this.disabled}
      >
        <div
          class="ordinal"
          slot="leading"
        >
          ${this._renderLeadingIcon()}
        </div>
        ${this._renderLeadingIcon()} ${this._renderAction()}
        <slot
          name="content"
          slot="content"
        ></slot>
      </tap-row>
    `;
  }
}
