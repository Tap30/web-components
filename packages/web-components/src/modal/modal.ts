import { LitElement, type PropertyValues, html, nothing } from "lit";
import { property, query } from "lit/decorators.js";

export class Modal extends LitElement implements HTMLDialogElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true })
  public open: boolean = false;

  @property({ type: String })
  public override title: string = "";

  @property({ type: String })
  public description: string = "";

  @property({ type: String })
  public alignment: "left" | "center" | "right" = "right";

  @property({ type: Boolean })
  public isBannerFullWidth = true;

  @query("#dialog")
  private _dialog?: HTMLElement | null;

  @query("#overlay")
  private _overlay?: HTMLElement | null;

  returnValue: string = "";

  constructor() {
    super();

    this.show = this.show.bind(this);
    this.showModal = this.showModal.bind(this);
    this.close = this.close.bind(this);
  }

  public override connectedCallback() {
    super.connectedCallback();
    this.addEventListener("keydown", this._handleKeydown);
    this.addEventListener("click", this._handleClick);
  }

  protected override updated(changed: PropertyValues<this>): void {
    const oldValue = changed.get("open");
    const newValue = this.open;
    const openChanged = oldValue !== undefined && oldValue !== newValue;

    if (!openChanged) return;

    if (newValue) {
      this._dialog?.focus();

      this.dispatchEvent(
        new Event("open", {
          bubbles: true,
          composed: true,
          cancelable: true,
        }),
      );
    } else {
      this.dispatchEvent(
        new Event("close", {
          bubbles: true,
          composed: true,
          cancelable: true,
        }),
      );
    }
  }

  private _handleClick(event: MouseEvent) {
    const { open, _overlay: overlay, _dialog: dialog } = this;

    if (!open) return;

    const path = event.composedPath();

    if (path.includes(overlay!) && !path.includes(dialog!)) {
      event.preventDefault();
      this.close();
    }
  }

  private _handleKeydown(event: KeyboardEvent) {
    // TODO: handle `Tab`, `Shift + Tab`.
    if (["Escape", "Esc"].includes(event.key)) {
      this.close();
    }
  }

  close(_returnValue?: string): void {}

  show(): void {
    this.open = true;
  }

  showModal(): void {
    this.show();
  }

  override render() {
    const containerClassName = this.isBannerFullWidth
      ? "image-container"
      : "icon-container";

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
          <div
            class="${containerClassName}"
            part="container"
          >
            <slot
              name="banner"
              part="banner"
            ></slot>
          </div>
          <div
            class="content ${this.alignment}"
            part="content"
          >
            ${this.title
              ? html`<span
                  id="title"
                  class="title"
                  part="title"
                  >${this.title}</span
                >`
              : nothing}
            ${this.description
              ? html`<p
                  id="description"
                  class="description"
                  part="description"
                >
                  ${this.description}
                </p>`
              : nothing}
          </div>
          <div
            class="actions"
            part="actions"
          >
            <slot name="actions"></slot>
          </div>
        </div>
      </section>
    `;
  }
}
