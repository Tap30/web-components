import {html, LitElement, PropertyValues} from "lit";
import {property} from "lit/decorators.js";
import {TapRow} from "../row";

export class Route extends TapRow {
  @property({reflect: true, attribute: "leading-icon"}) leadingIcon: "circle" | "square" | "plus" = "circle";

  @property({reflect: true}) ordinal: "first" | "middle" | "last" = "first";

  @property({type: Boolean, reflect: true}) editable: boolean = false;

  private renderOrdinal() {
    return html`
      <span class="ordinal" slot="leading">
        ${this.renderLeadingIcon()}
      </span>
    `;
  }

  private renderLeadingIcon() {
    switch (this.leadingIcon) {
      case 'circle':
        return html`
          <tap-icon-dot-fill></tap-icon-dot-fill>`;
      case 'square':
        return html`
          <tap-icon-square-fill></tap-icon-square-fill>`;
      case 'plus':
        return html`
          <tap-icon-plus-fill></tap-icon-plus-fill>`;
    }
  }

  private renderAction() {
    return this.editable ? html`<tap-icon-pencil-line-fill slot="trailing"></tap-icon-pencil-line-fill>` : '';
  }

  protected render(): unknown {
    return html`
      <tap-row size=${this.size}>
        ${this.renderOrdinal()}
        ${this.renderAction()}
        <slot name="content" slot="content"></slot>
      </tap-row>
    `;
  }
}
