import "@tapsioss/icons/dist/icons/cross";
import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";

export class BottomSheet extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true, attribute: "open" })
  public open: boolean = false;

  @property({ type: Boolean, reflect: true })
  public dismissible: boolean = true;

  @property({ type: Boolean, reflect: true, attribute: "has-dimmer" })
  public hasDimmer: boolean = false;

  @property({ type: String, reflect: true })
  public override title: string = "";

  @property({ type: Boolean, reflect: true })
  public expanded: boolean = false;

  @property({ type: Boolean, reflect: true, attribute: "show-grabber" })
  public showGrabber: boolean = true;

  @state()
  private _touchDirection: string = "";

  @state()
  private _disappear = false;

  @state()
  private _hasSlotHeaderContent = false;

  private _startX: number = 0;
  private _startY: number = 0;

  @query("#bottom-sheet")
  private _bottomSheetElement?: HTMLElement | null;

  @query(".bottom-sheet-header")
  private _headerElement?: HTMLElement | null;

  @query(".bottom-sheet-body")
  private _bodyElement?: HTMLElement | null;

  public override connectedCallback() {
    super.connectedCallback();

    if (this.showGrabber) this._attachEvents();
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    if (this.showGrabber) this._detachEvents();
  }

  private _attachEvents() {
    this.addEventListener("touchstart", this._handleTouchStart);
    this.addEventListener("touchend", this._handleTouchEnd);
  }

  private _detachEvents() {
    this.removeEventListener("touchstart", this._handleTouchStart);
    this.removeEventListener("touchend", this._handleTouchEnd);
  }

  protected override updated(changed: PropertyValues): void {
    if (changed.has("showGrabber")) {
      if (this.showGrabber) {
        this.style.setProperty("--tap-bottom-sheet-header-padding", "12px");
      }
    }

    if (changed.has("expanded") || changed.has("open")) {
      this._toggleSheetHeight();
    }

    if (changed.has("disappear")) this._handleDisappear();
  }

  private _handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 0) return;

    const touch = event.touches[0]!;

    this._startX = touch.clientX;
    this._startY = touch.clientY;
  };

  private _handleTouchEnd = (event: TouchEvent) => {
    if (!event.changedTouches.length) return;

    const touch = event.changedTouches[0]!;
    const deltaX = touch.clientX - this._startX;
    const deltaY = touch.clientY - this._startY;

    if (Math.abs(deltaX) >= Math.abs(deltaY)) return;

    this.expanded = this._touchDirection === "Up";
  };

  private _handleDisappear() {
    if (!this._disappear || !this._bottomSheetElement) return;

    this._bottomSheetElement.addEventListener(
      "animationend",
      this._handleAnimationEnd,
      { once: true },
    );

    this._bottomSheetElement.classList.add("close");
  }

  private _toggleSheetHeight() {
    if (!this._headerElement || !this._bodyElement) return;

    const headerHeight = this._headerElement.clientHeight;
    const bodyHeight = this._bodyElement.clientHeight;
    const bottomSheetHeight = headerHeight + bodyHeight;

    if (!this.expanded) {
      this.style.setProperty("--tap-bottom-sheet-content-overflow-y", "hidden");
      if (bodyHeight > 400) {
        this.style.setProperty("--tap-bottom-sheet-bottom", "-50dvh");
      } else {
        this.style.setProperty(
          "--tap-bottom-sheet-bottom",
          `calc(-90vh + ${bottomSheetHeight}px)`,
        );
      }
    } else {
      this.style.setProperty("--tap-bottom-sheet-bottom", "0");
      this.style.setProperty("--tap-bottom-sheet-content-overflow-y", "scroll");
    }
  }

  private _handleDismiss() {
    this._disappear = true;

    this.dispatchEvent(
      new CustomEvent("close", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleAnimationEnd = () => {
    if (this._disappear) {
      this.open = false;
      this._disappear = false;
      if (this._bottomSheetElement) this._bottomSheetElement.remove();
    }
  };

  private _handleUpdateHeaderSlot = (): void => {
    const slot = this.shadowRoot?.querySelector(
      'slot[name="bottom-sheet-header"]',
    ) as HTMLSlotElement;

    this._hasSlotHeaderContent =
      slot?.assignedNodes({ flatten: true }).length > 0;
  };

  private _renderDismissButton() {
    if (!this.dismissible) return nothing;

    return html`
      <div class="close-button">
        <tap-icon-button
          @click=${() => this._handleDismiss()}
          type="button"
          size="small"
          variant="naked"
        >
          <tap-icon-cross color="#000"></tap-icon-cross>
        </tap-icon-button>
      </div>
    `;
  }

  private _renderGrabber() {
    if (!this.showGrabber) return nothing;

    return html`<div class="grabber"></div>`;
  }

  private _renderDimmer() {
    if (!this.hasDimmer) return nothing;

    return html`<section
      class="bottom-sheet-dimmer"
      @click="${() => this._handleDismiss()}"
      part="dimmer"
    ></section>`;
  }

  protected override render() {
    if (!this.open) return html``;

    return html`
      ${this._renderDimmer()}
      <section
        id="bottom-sheet"
        class="bottom-sheet"
      >
        ${this._renderGrabber()}
        <slot
          name="bottom-sheet-header"
          @slotchange=${this._handleUpdateHeaderSlot}
        ></slot>
        ${this._hasSlotHeaderContent
          ? nothing
          : html`
              <div
                class="bottom-sheet-header"
                part="header"
              >
                <div class="title">${this.title}</div>
                ${this._renderDismissButton()}
              </div>
            `}
        <div
          class="bottom-sheet-body"
          part="body"
        >
          <slot></slot>
        </div>
      </section>
    `;
  }
}
