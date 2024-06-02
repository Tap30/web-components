import { LitElement, PropertyValues, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export class Banner extends LitElement {
  @property() heading?: string;
  @property() description?: string;
  @property() image?: string;
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;
  @property() variant: 'default' | 'hero' = 'default';
  @property({ attribute: 'background-color' }) backgroundColor?: string;
  @property({ attribute: 'text-color' }) textColor?: string;
  // @property() loading?: boolean;

  protected updated(changed: PropertyValues): void {
    if (changed.has('backgroundColor') && !!this.backgroundColor) {
      this.style.setProperty(
        '--tap-banner-color-surface',
        this.backgroundColor,
      );
    }

    if (changed.has('textColor') && !!this.textColor) {
      this.style.setProperty('--tap-banner-color-content', this.textColor);
    }

    if (changed.has('image') && !!this.image) {
      this.style.setProperty(
        '--tap-banner-background-image',
        `url(${this.image})`,
      );
    }
  }

  render() {
    return html`
      <div
        role="banner"
        class=${classMap({
          banner: true,
          hero: this.variant === 'hero',
        })}
      >
        ${this.variant === 'hero'
          ? html`
              <div class="extra">
                <slot name="extra"></slot>
              </div>
            `
          : nothing}
        <div class="content">
          ${this.heading ? html`<h4>${this.heading}</h4>` : nothing}
          ${this.description ? html`<p>${this.description}</p>` : nothing}
          <div class="action">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
