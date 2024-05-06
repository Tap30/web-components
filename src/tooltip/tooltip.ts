import { html, LitElement, PropertyValues, nothing } from "lit";
import { property } from "lit/decorators.js"
import "../icons/index.js";
import "../button/index";

export class Tooltip extends LitElement {
  static readonly shadowOptions = {
    
  }

  @property({ type: String }) pointer: 'top' | 'right' | 'left' | 'bottom' = 'bottom';
  @property({ type: String }) pointerAlignment: 'start' | 'end' | 'middle' = 'middle';
  @property({ type: Boolean }) dismissible: boolean = true;
  @property({ type: String }) width: string = "10px";

  protected updated(changed: PropertyValues): void {
    if (changed.has("width")) {
      this.style.setProperty("--tap-tooltip-width", this.width);
    }
  }

  private renderDismissIcon() {
    return this.dismissible ? html`
      <tap-button size="small" variant="naked" shape="circle" .icon=${html`<tap-icon-cross color="#fff"></tap-icon-cross>`}></tap-button>
    ` : nothing;
  }

  private renderPointerIcon() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
        <path d="M5.0001 0V10L0.707205 5.70711C0.316681 5.31658 0.316682 4.68342 0.707206 4.29289L5.0001 0Z" fill="#323333"/>
      </svg>
    `
  }

  render() {
    return html`
      <div class="tooltip ${this.pointer} ${this.pointerAlignment}">
        ${this.renderDismissIcon()}
        <div class="tooltip-icon">
          ${this.renderPointerIcon()}
        </div>
        <div class="tooltip-label">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
