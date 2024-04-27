import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js"
import "../icons/index.js";
import "../button/index";

export class Tooltip extends LitElement {
  static readonly shadowOptions = {
    
  }

  @property({ type: String }) label: string = '';

  @property({ type: String }) pointer: 'top' | 'right' | 'left' | 'bottom' = 'bottom';

  @property({ type: String }) pointerAlignment: 'start' | 'end' | 'middle' = 'middle';

  @property({ type: Boolean }) dismissible: boolean = true;

  @property({ type: Number }) width: number | null = null;

  private renderDismissIcon() {
    return this.dismissible ? html`
      <tap-button size="small" variant="naked" shape="circle" .icon=${html`<tap-icon-cross color="#fff"></tap-icon-cross>`}></tap-button>
    ` : nothing;
  }

  render() {
    return html`
      <div class="tooltip ${this.pointer} ${this.pointerAlignment}">
        ${this.renderDismissIcon()}
        <div class="tooltip-label">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
