import { LitElement, PropertyValues, html } from 'lit';
import { property, state } from 'lit/decorators.js';

export class Avatar extends LitElement {
  @state() private hasError = false;

  @property() image = '';

  @property() label = '';

  @property() loading: 'eager' | 'lazy' = 'eager';

  @property() size: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' =
    'medium';

  protected updated(changed: PropertyValues) {
    if (changed.has('image')) {
      this.hasError = false;
    }
  }

  private renderImage() {
    return html`
      <img
        alt=""
        part="image"
        src="${this.image}"
        loading="${this.loading}"
        @error="${() => (this.hasError = true)}"
      />
    `;
  }

  private renderPlaceholder() {
    return html` <div part="placeholder" aria-hidden="true" class="placeholder">
      <slot></slot>
    </div>`;
  }

  render() {
    return html`
      <div role="img" aria-label=${this.label} part="avatar" class="avatar">
        ${this.image && !this.hasError
          ? this.renderImage()
          : this.renderPlaceholder()}
      </div>
    `;
  }
}
