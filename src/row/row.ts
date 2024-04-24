import {html, LitElement, nothing} from "lit";
import {property, state} from "lit/decorators.js";
import '../divider';

export class Row extends LitElement {
  @property({ reflect: true }) size: "standard" | "compact" = "standard";

  @property({ reflect: true, type: Boolean }) divider: boolean = false;

  @property({ reflect: true }) title: string = '';

  @property({ reflect: true }) subtitle?: string;

  private hasSlotContent(slotName: string): boolean {
    const slot = this.shadowRoot?.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement;
    return slot?.assignedNodes({flatten: true}).length > 0;
  }

  private hideSlotContainerIfNotExists(slotName: string) {
    const hasSlot = this.hasSlotContent(slotName);
    const slotContainer = this.shadowRoot?.getElementById(`row-${slotName}`);
    if (slotContainer) {
      slotContainer.classList.toggle('hidden', !hasSlot);
    }
  }

  private updateSlotsVisibility() {
    this.hideSlotContainerIfNotExists('leading');
    this.hideSlotContainerIfNotExists('trailing');
    ['row-title', 'row-subtitle'].forEach((id) => {
      const element = this.shadowRoot?.getElementById(id);
      if (element) element.style.display = this.hasSlotContent('content') ? 'none' : 'block'
    })
  }

  protected firstUpdated() {
    this.updateSlotsVisibility();
  }

  protected updated() {
    this.updateSlotsVisibility();
  }

  protected render(): unknown {
    return html`
      <div class="row-container">
        <span class="row-leading">
          <slot name="leading" @slotchange="${this.updateSlotsVisibility}"></slot>
        </span>
          <span class="row-content">
             <slot name="content" @slotchange=${this.updateSlotsVisibility}></slot>
              ${this.title ? html`<b id="row-title" class="row-title">${this.title}</b>` : nothing}
              ${this.subtitle ? html`<p id="row-subtitle" class="row-subtitle">${this.subtitle || ''}</p>` : nothing}
          </span>
          <span class="row-trailing">
            <slot name="trailing" @slotchange="${this.updateSlotsVisibility}"></slot>
        </span>
        </div>
      <tap-divider class="row-divider"> </tap-divider>
    `;
  }
}
