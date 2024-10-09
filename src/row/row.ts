import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";

export class Row extends LitElement {
  @property({ reflect: true })
  public size: "standard" | "compact" = "standard";

  @property({ type: Boolean, reflect: true })
  public navigable: boolean = false;

  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  private _hasSlotContent(slotName: string): boolean {
    const slot = this.shadowRoot?.querySelector(
      `slot[name="${slotName}"]`,
    ) as HTMLSlotElement;

    return slot?.assignedNodes({ flatten: true }).length > 0;
  }

  private _hideSlotContainerIfNotExists(slotName: string) {
    const slotContainer = this.shadowRoot?.getElementById(slotName);

    if (slotContainer) {
      const hasSlot = this._hasSlotContent(slotName);

      slotContainer.classList.toggle("hidden", !hasSlot);
    }
  }

  private _updateSlotsVisibility() {
    this._hideSlotContainerIfNotExists("leading");
    this._hideSlotContainerIfNotExists("trailing");

    ["title", "subtitle"].forEach(id => {
      const element = this.shadowRoot?.getElementById(id);

      if (element) {
        element.style.display = this._hasSlotContent("content")
          ? "none"
          : "block";
      }
    });
  }

  private _getDirection() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let element: Element | null = this;
    let direction = getComputedStyle(element).direction;

    while (direction === "ltr" && element.parentElement) {
      element = element.parentElement;
      direction = getComputedStyle(element).direction;
    }

    return direction;
  }

  private _changeNavigableDirections() {
    if (!this.navigable) return;

    const direction = this._getDirection();
    const navigableElement = this.shadowRoot?.getElementById("navigable");

    if (!navigableElement) return;

    navigableElement.style.transform = `rotate(${direction === "ltr" ? "180" : "0"}deg)`;
  }

  protected override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this._updateSlotsVisibility();
    this._changeNavigableDirections();
  }

  private _renderNavigableIcon() {
    return html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.9143 8.46445L10.3794 11.9993L13.9143 15.5355L12.5 16.9497L7.55029 12L12.5 7.05023L13.9143 8.46445Z"
          fill="#B1B2B2"
        />
      </svg>
    `;
  }

  private _renderOverlay() {
    if (!this.disabled) return nothing;

    return html` <div class="overlay"></div> `;
  }

  protected override render() {
    return html`
      <div
        class="container"
        part="row"
      >
        <span
          class="leading"
          part="leading"
        >
          <slot
            name="leading"
            @slotchange="${this._updateSlotsVisibility}"
          ></slot>
        </span>
        <span
          class="content"
          part="content"
        >
          <slot
            name="content"
            @slotchange=${this._updateSlotsVisibility}
          ></slot>
        </span>
        <span
          class="trailing"
          part="trailing"
        >
          <slot
            name="trailing"
            @slotchange="${this._updateSlotsVisibility}"
          ></slot>
        </span>
        <span
          id="navigable"
          part="navigable"
        >
          ${this._renderNavigableIcon()}
        </span>
        ${this._renderOverlay()}
      </div>
    `;
  }
}
