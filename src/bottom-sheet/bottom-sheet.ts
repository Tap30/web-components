import { html, LitElement, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import '@tapsioss/icons/dist/icons/cross';

export class BottomSheet extends LitElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    // mode: 'open',
  };

  @property({ type: Boolean, reflect: true, attribute: 'is-open' })
  isOpen: boolean = false;

  @property({ type: Boolean, reflect: true })
  disappear: boolean = false;

  @property({ type: Boolean, reflect: true })
  isDismissible: boolean = true;

  @property({ type: String, reflect: true })
  title: string = '';

  @property({ type: Boolean, reflect: true })
  isExpanded: boolean = false;

  @property({ type: Boolean, reflect: true })
  showGrabber: boolean = true;

  @query('#bottom-sheet')
  private bottomSheetElement?: HTMLElement | null;

  @query('.bottom-sheet-header')
  private headerElement?: HTMLElement | null;

  @query('.bottom-sheet-body')
  private bodyElement?: HTMLElement | null;

  constructor() {
    super();
    this.handleSheetExpand = this.handleSheetExpand.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    //this.addEventListener('touchstart', this.handleSheetExpand);
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('showGrabber')) {
      this.showGrabber &&
        this.style.setProperty('--tap-bottom-sheet-header-padding', '12px');
    }

    if (changed.has('isExpanded') && this.headerElement && this.bodyElement) {
      const headerHeight = this.headerElement.clientHeight;
      const bodyHeight = this.bodyElement.clientHeight;
      const bottomSheetHeight = headerHeight + bodyHeight;
      !this.isExpanded &&
        this.style.setProperty(
          '--tap-bottom-sheet-bottom',
          `calc(-90vh + ${bottomSheetHeight})`,
        );
    }

    if (changed.has('isOpen')) {
      if (!this.isOpen && this.bottomSheetElement) {
        this.bottomSheetElement.addEventListener(
          'transitionend',
          this.handleTransitionEnd,
          {
            once: true,
          },
        );
        this.bottomSheetElement.classList.add('close');
      }
    }
  }

  handleSheetExpand(): void {}

  handleDismiss(): void {
    this.isOpen = false;
  }

  private handleTransitionEnd() {
    this.bottomSheetElement && this.bottomSheetElement.remove();
    // TODO: set mode to close
  }

  private renderDismissButton() {
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
  }

  private renderGrabber() {
    if (this.showGrabber) return html`<div class="grabber"></div>`;
  }

  render() {
    if (!this.isOpen) return html``;
    return html`
      <section class="bottom-sheet-dimmer"></section>
      <section id="bottom-sheet" class="bottom-sheet">
        ${this.renderGrabber()}
        <div class="bottom-sheet-header">
          <div class="title">${this.title}</div>
          <div class="close-button">${this.renderDismissButton()}</div>
        </div>
        <div class="bottom-sheet-body">
          <slot name="bottom-sheet-body"></slot>
        </div>
      </section>
    `;
  }
}
