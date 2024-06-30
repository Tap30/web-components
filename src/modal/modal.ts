import { LitElement, PropertyValues, html, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';

export class Modal extends LitElement implements HTMLDialogElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  @property({ type: String })
  title: string = "";

  @property({ type: String })
  description: string = "";

  @property({ type: String })
  alignment: 'left' | 'center' | 'right' = 'right';

  @property({ type: String })
  image?: string;

  @query('#dialog')
  private dialog?: HTMLElement | null;

  @query('#overlay')
  private overlay?: HTMLElement | null;

  returnValue: string = '';

  constructor() {
    super();
    this.show = this.show.bind(this);
    this.showModal = this.showModal.bind(this);
    this.close = this.close.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('click', this.handleClick);
  }

  protected updated(changed: PropertyValues<this>): void {
    const oldValue = changed.get('open');
    const newValue = this.open;
    const openChanged = oldValue !== undefined && oldValue !== newValue;

    if (openChanged) {
      if (newValue) {
        this.dialog?.focus();

        this.dispatchEvent(
          new Event('open', {
            bubbles: true,
            composed: true,
            cancelable: true,
          }),
        );
      } else {
        this.dispatchEvent(
          new Event('close', {
            bubbles: true,
            composed: true,
            cancelable: true,
          }),
        );
      }
    }
  }

  private handleClick(event: MouseEvent) {
    const { open, overlay, dialog } = this;
    if (open) {
      const path = event.composedPath();
      if (path.includes(overlay!) && !path.includes(dialog!)) {
        event.preventDefault();
        this.close();
      }
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    // TODO: handle `Tab`, `Shift + Tab`.
    if (['Escape', 'Esc'].includes(event.key)) {
      this.close();
    }
  }

  close(returnValue?: string): void {
    if (returnValue) {
      this.returnValue = returnValue;
    }

    this.open = false;
  }

  show(): void {
    this.open = true;
  }

  showModal(): void {
    this.show();
  }

  render() {
    return html`
      <section ?hidden=${!this.open}>
        <div
          ?hidden=${!this.open}
          class="overlay"
          id="overlay"
          part="overlay"
        ></div>
        <div
          ?hidden=${!this.open}
          id="dialog"
          part="dialog"
          class="dialog"
          tabindex="0"
          role="dialog"
          aria-modal="true"
          aria-label=${nothing}
          aria-labelledby=${nothing}
          aria-describedby=${nothing}
        >
        ${this.image
        ? html`
          <div class="image-container" part="image-container">
            <img class="image" part="image" src=${this.image} alt="dialog image" />
          </div>`
        : html`
          <div class="icon" part="icon"><slot name="icon"></slot></div>
        `}
          <div class="content ${this.alignment}" part="content">
            ${this.title ? html`<span id="title" class="title" part="title">${this.title}</span>` : nothing}
            ${this.description ? html`<p id="description" class="description" part="description">${this.description}</p>` : nothing}
          </div>
          <div class="actions" part="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </section>
    `;
  }
}
