import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import '@tapsioss/icons/dist/icons/cross';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';

export class BottomSheet extends LitElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  @property({ type: Boolean, reflect: true })
  isExpanded: boolean = false;

  @property({ type: Boolean, reflect: true })
  showGrabber: boolean = true;

  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleOpen(): void {}

  handleDismiss(): void {
    
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('showGrabber')) {
      this.style.setProperty('--tap-bottom-sheet-header-padding', '12px');
    }
  }

  private renderDismissButton() {
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

  render() {
    return html`
      <section class="bottom-sheet-dimmer"></section>
      <section class="bottom-sheet">
        <div class="grabber"></div>
        <div class="bottom-sheet-header">
          <div class="title">عنوان</div>
          <div class="close-button">${this.renderDismissButton()}</div>
        </div>
        <div class="bottom-sheet-body">This is body!! :)</div>
      </section>
    `;
  }
}
