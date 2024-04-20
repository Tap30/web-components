import { html, LitElement } from "lit";
import { property } from "lit/decorators.js"

export class Tooltip extends LitElement {
  static readonly shadowOptions = {
    
  }

  @property({ type: String }) label = '';

  @property({ type: String }) backgroundColor = '';

  @property({ type: String }) pointer?: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  render() {
    return html`
      <div>
      </div>
    `;
  }
}
