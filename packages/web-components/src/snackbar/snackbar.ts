import "../button/icon-button";

import { html, LitElement, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals";
import { getRenderRootSlot, waitAMicrotask } from "../utils";
import { Slots } from "./constants";
import { HideEvent, ShowEvent } from "./events";
import { close, error, info, success, warning } from "./icons";

export class Snackbar extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Sets the text of the snackbar.
   */
  @property()
  public text = "";

  /**
   * Determines whether the snackbar is open or not.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * The color of the snackbar, indicating the type of message.
   * Defaults to `inverse`.
   */
  @property()
  public color: "success" | "error" | "info" | "warning" | "inverse" =
    "inverse";

  /**
   * Indicates whether the snackbar can be dismissed.
   */
  @property({ type: Boolean })
  public dismissible = false;

  /**
   * The time before the snackbar automatically closes (in milliseconds).
   */
  @property({ type: Number })
  public duration: number = -1;

  @state()
  private _hasIconSlot = false;

  private _timeoutRef = -1;

  constructor() {
    super();

    this._handleDocumentKeyDown = this._handleDocumentKeyDown.bind(this);
  }

  private _attachGlobalEvents() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    document.addEventListener("keydown", this._handleDocumentKeyDown);
  }

  private _detachGlobalEvents() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    document.removeEventListener("keydown", this._handleDocumentKeyDown);
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    if (this.open) this._attachGlobalEvents();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (!this.open) this._detachGlobalEvents();
    window.clearTimeout(this._timeoutRef);
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (this.open) {
      const autoHideDuration =
        this.duration < 0 ? this._calculateAutoHideDuration() : this.duration;

      this._attachGlobalEvents();
      this._timeoutRef = window.setTimeout(() => {
        this.hide();
      }, autoHideDuration);
    } else {
      this._detachGlobalEvents();
      window.clearTimeout(this._timeoutRef);
    }
  }

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    const iconSlot = getRenderRootSlot(this.renderRoot, Slots.ICON);

    this._hasIconSlot = (iconSlot?.assignedNodes().length ?? 0) > 0;
  }

  private _calculateAutoHideDuration() {
    const wordsCount = this.text.split(" ").length;

    return wordsCount * 300 + 1250;
  }

  public show() {
    if (this.open) return;

    this.open = true;

    const eventAllowed = this.dispatchEvent(new ShowEvent());

    if (!eventAllowed) this.open = false;
  }

  public hide() {
    if (!this.open) return;

    this.open = false;

    const eventAllowed = this.dispatchEvent(new HideEvent());

    if (!eventAllowed) this.open = true;
  }

  private _renderDismiss() {
    if (!this.dismissible) return null;

    return html`
      <tapsi-icon-button
        part="dismiss"
        size="sm"
        variant="naked"
        label="Dismiss snackbar"
        id="dismiss"
        class="dismiss"
        @click=${() => this.hide()}
      >
        ${close}
      </tapsi-icon-button>
    `;
  }

  private async _handleDocumentKeyDown(event: KeyboardEvent) {
    if (!this.open) return;
    if (event.key !== KeyboardKeys.ESCAPE) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    event.preventDefault();

    this.hide();
  }

  private _renderIcon() {
    if (this.color === "success") return success;
    if (this.color === "error") return error;
    if (this.color === "info") return info;
    if (this.color === "warning") return warning;

    return html`<slot name=${Slots.ICON}></slot>`;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      open: this.open,
      [this.color]: true,
    });

    return html`
      <div
        class=${rootClasses}
        id="root"
        part="root"
        role="presentation"
        tabindex="-1"
        aria-hidden=${!this.open}
        ?inert=${!this.open}
      >
        <div
          id="container"
          class="container"
          part="container"
          role="alert"
          aria-labelledby="text"
        >
          <div
            class="body"
            part="body"
          >
            <div
              id="icon"
              class="icon"
              part="icon"
              ?hidden=${this.color === "inverse" && !this._hasIconSlot}
            >
              ${this._renderIcon()}
            </div>
            <div
              id="text"
              class="text"
              part="text"
            >
              ${this.text}
            </div>
            ${this._renderDismiss()}
          </div>
        </div>
      </div>
    `;
  }
}
