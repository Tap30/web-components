import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class Divider extends LitElement {
  @property({ reflect: true }) type: 'thin' | 'medium' | 'bold' = 'medium';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }
}
