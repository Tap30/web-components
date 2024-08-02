import { html, LitElement, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import '@tapsioss/icons/dist/icons/cross';

export class BottomSheet extends LitElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    // mode: 'open',
  };

  @property({ type: Boolean, reflect: true })
  open: boolean = false;

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

  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('showGrabber')) {
      this.showGrabber &&
        this.style.setProperty('--tap-bottom-sheet-header-padding', '12px');
    }

    if (changed.has('open')) {
      if (!this.open && this.bottomSheetElement) {
        this.bottomSheetElement.addEventListener(
          'transitionend',
          this.handleTransitionEnd,
          {
            once: true,
          },
        );
        this.bottomSheetElement.classList.add('open');
      }
    }
  }

  handleOpen(): void {}

  handleDismiss(): void {
    this.open = false;
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
    return html`
      <section class="bottom-sheet-dimmer"></section>
      <section id="bottom-sheet" class="bottom-sheet">
        ${this.renderGrabber()}
        <div class="bottom-sheet-header">
          <div class="title">${this.title}</div>
          <div class="close-button">${this.renderDismissButton()}</div>
        </div>
        <div class="bottom-sheet-body">This is body!! :)</div>
      </section>
    `;
  }
}
