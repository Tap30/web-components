import { html, LitElement } from 'lit';
import '../../../styles/theme.css'

export class Do extends LitElement {
  render() {
    return html`
      <div class="container">
        <span class="badge">Do</span>
        <slot></slot>
      </div>
    `;
  }
}
