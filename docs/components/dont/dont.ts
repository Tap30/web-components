import { html, LitElement } from 'lit';
import '../../../styles/theme.css'

export class Dont extends LitElement {
  render() {
    return html`
      <div class="container">
        <span class="badge">Don't</span>
        <slot></slot>
      </div>
    `;
  }
}
