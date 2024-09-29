import {html, LitElement} from 'lit';

export class Row extends LitElement {
  render() {
    return html`
      <div part="row" class="row">
        <slot></slot>
      </div>
    `;
  }
}

