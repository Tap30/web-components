import {html, LitElement, nothing, PropertyValues} from "lit";
import {property} from "lit/decorators.js";

export class Row extends LitElement {
  @property({reflect: true}) size: "standard" | "compact" = "standard";

  @property({type: Boolean, reflect: true}) navigable: boolean = false;

  @property({type: Boolean, reflect: true}) disabled: boolean = false;

  private hasSlotContent(slotName: string): boolean {
    const slot = this.shadowRoot?.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement;
    return slot?.assignedNodes({flatten: true}).length > 0;
  }

  private hideSlotContainerIfNotExists(slotName: string) {
    const slotContainer = this.shadowRoot?.getElementById(slotName);
    if (slotContainer) {
      const hasSlot = this.hasSlotContent(slotName);
      slotContainer.classList.toggle('hidden', !hasSlot);
    }
  }

  private updateSlotsVisibility() {
    this.hideSlotContainerIfNotExists('leading');
    this.hideSlotContainerIfNotExists('trailing');
    ['title', 'subtitle'].forEach((id) => {
      const element = this.shadowRoot?.getElementById(id);
      if (element) element.style.display = this.hasSlotContent('content') ? 'none' : 'block'
    })
  }

  private getDirection() {
    let element: Element | null = this;
    let direction = getComputedStyle(element).direction;
    while (direction === 'ltr' && element.parentElement) {
      element = element.parentElement;
      direction = getComputedStyle(element).direction;
    }
    return direction
  }

  private changeNavigableDirections() {
    if (this.navigable) {
      const direction = this.getDirection();
      const navigableElement = this.shadowRoot?.getElementById('navigable');
      if (navigableElement) navigableElement.style.transform = `rotate(${direction === 'ltr' ? '180' : '0'}deg)`;
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.updateSlotsVisibility();
    this.changeNavigableDirections();
  }

  private renderNavigableIcon() {
    return html`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.9143 8.46445L10.3794 11.9993L13.9143 15.5355L12.5 16.9497L7.55029 12L12.5 7.05023L13.9143 8.46445Z"
              fill="#B1B2B2"/>
      </svg>
    `
  }

  private renderOverlay() {
    return this.disabled
      ? html`
        <div class="overlay"/>
      `
      : nothing;
  }

  protected render(): unknown {
    return html`
      <div class="container" part="row">
        <span class="leading" part="leading">
          <slot name="leading" @slotchange="${this.updateSlotsVisibility}"></slot>
        </span>
        <span class="content" part="content">
             <slot name="content" @slotchange=${this.updateSlotsVisibility}></slot>
          </span>
        <span class="trailing" part="trailing">
            <slot name="trailing" @slotchange="${this.updateSlotsVisibility}"></slot>
          </span>
        <span id="navigable" part="navigable">
              ${this.renderNavigableIcon()}
        </span>
        ${this.renderOverlay()}
      </div>
    `;
  }
}
