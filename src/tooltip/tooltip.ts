import { html, LitElement } from "lit";
import { property } from "lit/decorators.js"
import "../button/index";

export class Tooltip extends LitElement {
  static readonly shadowOptions = {
    
  }

  @property({ type: String }) label = '';

  @property({ type: String }) backgroundColor = '';

  @property({ type: String }) pointer?: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  private renderDismissIcon() {
    return html`
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1568 7.75735L13.9142 12L18.1568 16.2426L16.7426 17.6568L12.5 13.4142L8.25735 17.6568L6.84314 16.2426L11.0858 12L6.84314 7.75735L8.25735 6.34314L12.5 10.5858L16.7426 6.34314L18.1568 7.75735Z" fill="currentColor"/>
      </svg>
    `
  }

  render() {
    return html`
      <div class="tooltip">
        <tap-button size="small" variant="naked" shape="circle" .icon=${this.renderDismissIcon()}></tap-button>
        <div class="tooltip-label">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
