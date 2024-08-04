import { html, LitElement, PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import '@tapsioss/icons/dist/icons/cross';

export class BottomSheet extends LitElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true, attribute: 'is-open' })
  isOpen: boolean = false;

  @property({ type: Boolean, reflect: true })
  isDismissible: boolean = true;

  @property({ type: Boolean, reflect: true, attribute: 'has-dimmer' })
  hasDimmer: boolean = false;

  @property({ type: String, reflect: true })
  title: string = '';

  @property({ type: Boolean, reflect: true, attribute: 'is-expanded' })
  isExpanded: boolean = false;

  @property({ type: Boolean, reflect: true })
  showGrabber: boolean = true;

  @state() private touchDirection: string = '';

  @state() private disappear = false;

  private startX: number = 0;
  private startY: number = 0;

  @query('#bottom-sheet')
  private bottomSheetElement?: HTMLElement | null;

  @query('.bottom-sheet-header')
  private headerElement?: HTMLElement | null;

  @query('.bottom-sheet-body')
  private bodyElement?: HTMLElement | null;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  private addEventListeners = (): void => {
    this.addEventListener('touchstart', this.handleTouchStart);
    this.addEventListener('touchend', this.handleTouchEnd);
  };

  private removeEventListeners = (): void => {
    this.removeEventListener('touchstart', this.handleTouchStart);
    this.removeEventListener('touchend', this.handleTouchEnd);
  };

  protected updated(changed: PropertyValues): void {
    if (changed.has('showGrabber')) {
      this.showGrabber &&
        this.style.setProperty('--tap-bottom-sheet-header-padding', '12px');
    }

    if (changed.has('isExpanded')) this.toggleSheetHeight();

    if (changed.has('disappear')) this.handleDisappear();
  }

  private handleTouchStart = (event: TouchEvent): void => {
    if (event.touches.length) {
      const touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    }
  };

  private handleTouchEnd = (event: TouchEvent): void => {
    if (!event.changedTouches.length) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - this.startX;
    const deltaY = touch.clientY - this.startY;

    if (Math.abs(deltaX) >= Math.abs(deltaY)) return;

    this.touchDirection = deltaY > 0 ? 'Down' : 'Up';
    this.isExpanded = this.touchDirection === 'Up';
  };

  private handleDisappear = (): void => {
    if (this.disappear && this.bottomSheetElement) {
      this.bottomSheetElement.addEventListener(
        'animationend',
        this.handleAnimationEnd,
        { once: true },
      );
      this.bottomSheetElement.classList.add('close');
    }
  };

  private toggleSheetHeight = (): void => {
    if (this.headerElement && this.bodyElement) {
      const headerHeight = this.headerElement.clientHeight;
      const bodyHeight = this.bodyElement.clientHeight;
      const bottomSheetHeight = headerHeight + bodyHeight;
      !this.isExpanded &&
        this.style.setProperty(
          '--tap-bottom-sheet-bottom',
          `calc(-90vh + ${bottomSheetHeight}px)`,
        );

      this.isExpanded &&
        this.style.setProperty('--tap-bottom-sheet-bottom', '0');
    }
  };

  private handleDismiss = (): void => {
    this.disappear = true;
  };

  private handleAnimationEnd = () => {
    if (this.disappear) {
      this.isOpen = false;
      this.disappear = false;
      this.bottomSheetElement && this.bottomSheetElement.remove();
    }
  };

  private renderDismissButton = () => {
    if (this.isDismissible)
      return html`
        <tap-icon-button
          @click=${() => this.handleDismiss()}
          type="button"
          size="small"
          variant="naked"
          }
        >
          <tap-icon-cross color="#000"></tap-icon-cross>
        </tap-icon-button>
      `;
  };

  private renderGrabber() {
    if (this.showGrabber) return html`<div class="grabber"></div>`;
  }

  private renderDimmer() {
    if (this.hasDimmer)
      return html`<section
        class="bottom-sheet-dimmer"
        @click="${() => this.handleDismiss()}"
      ></section>`;
  }

  render() {
    if (!this.isOpen) return html``;
    return html`
      ${this.renderDimmer()}
      <section id="bottom-sheet" class="bottom-sheet">
        ${this.renderGrabber()}
        <div class="bottom-sheet-header" part="header">
          <div class="title">${this.title}</div>
          <div class="close-button">${this.renderDismissButton()}</div>
        </div>
        <div class="bottom-sheet-body" part="body">
          <slot name="bottom-sheet-body"></slot>
        </div>
      </section>
    `;
  }
}
