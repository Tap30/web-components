import "../icon-button";

import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { ref, type Ref } from "lit/directives/ref.js";
import { getBoundingClientRect } from "../utils";
import { Parts, Slots } from "./constants";
import { OpenChangeEvent } from "./events";
import { dismiss } from "./icons";

export class BottomSheet extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean })
  public open = false;

  @property({ type: String, reflect: true, attribute: "dismiss-strategy" })
  public dismissStrategy: "grabber" | "button" = "button";

  @property({ type: String, reflect: true, attribute: "overlay-visibility" })
  public overlayVisibility: "on-expansion" | "visible" | "hidden" =
    "on-expansion";

  @state()
  private _isDragStarted = false;

  @state()
  private _minHeight = 0;

  @state()
  private _maxHeight = 0;

  private _rootRef?: Ref<HTMLElement>;

  constructor() {
    super();

    this._handleDragEnd = this._handleDragEnd.bind(this);
    this._handleDragStart = this._handleDragStart.bind(this);
    this._handleDragging = this._handleDragging.bind(this);
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (this.dismissStrategy === "grabber") {
      document.addEventListener("mouseup", this._handleDragEnd);
      document.addEventListener("touchend", this._handleDragEnd);

      document.addEventListener("mousemove", this._handleDragging);
      document.addEventListener("touchmove", this._handleDragging);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.dismissStrategy === "grabber") {
      document.removeEventListener("mouseup", this._handleDragEnd);
      document.removeEventListener("touchend", this._handleDragEnd);

      document.removeEventListener("mousemove", this._handleDragging);
      document.removeEventListener("touchmove", this._handleDragging);
    }
  }

  private _emitExpandChange(): void {}

  private _emitOpenChange(newOpenState: boolean): void {
    this.dispatchEvent(new OpenChangeEvent(newOpenState));
  }

  private _handleDismissButtonClick(): void {
    this._emitOpenChange(!this.open);
  }

  private _renderDismissButton() {
    return html`
      <tap-icon-button
        class=${Parts.DISMISS}
        part=${Parts.DISMISS}
        size="small"
        variant="ghost"
        @click=${this._handleDismissButtonClick}
      >
        <span
          class=${Parts.DISMISS_ICON}
          part=${Parts.DISMISS_ICON}
          >${dismiss}</span
        >
      </tap-icon-button>
    `;
  }

  private _renderGrabber() {
    return html`
      <div
        class=${Parts.GRABBER}
        part=${Parts.GRABBER}
      ></div>
    `;
  }

  private _renderOverlay() {
    if (this.overlayVisibility === "hidden") return nothing;

    return html`
      <div
        part=${Parts.OVERLAY}
        class=${Parts.OVERLAY}
      ></div>
    `;
  }

  private _renderDismissAction() {
    if (this.dismissStrategy === "grabber") return this._renderGrabber();

    return this._renderDismissButton();
  }

  private _getClientY(event: MouseEvent | TouchEvent) {
    return event.type === "touchmove"
      ? (event as TouchEvent).touches[0]?.clientY ?? 0
      : (event as MouseEvent).clientY;
  }

  private _getRootBoundingRect() {
    if (!this._rootRef?.value) return null;

    return getBoundingClientRect(this._rootRef.value);
  }

  private _handleDragStart(event: MouseEvent | TouchEvent): void {
    this._isDragStarted = true;
  }

  private _handleDragEnd(event: MouseEvent | TouchEvent): void {
    this._isDragStarted = false;
  }

  private _handleDragging(event: MouseEvent | TouchEvent): void {
    if (!this._isDragStarted) return;

    const rect = this._getRootBoundingRect();

    if (!rect) return;

    if (event.cancelable) {
      event.preventDefault();
      event.stopPropagation();
    }

    let clientY = this._getClientY(event);

    clientY = clientY - rect.top;

    if (clientY === 0) return;

    if (clientY > 0) {
      // TODO: increase the height and emit expanding
    } else {
      // TODO: decrease the height and emit expanding
    }
  }

  protected override render() {
    return html`
      <div
        ${ref(this._rootRef)}
        part=${Parts.ROOT}
        class=${Parts.ROOT}
      >
        OpenState: ${this.open}${this._renderOverlay()}
        <div
          part=${Parts.HEADER}
          class=${Parts.HEADER}
        >
          ${this._renderDismissAction()}
          <slot name=${Slots.HEADER}></slot>
        </div>
        <div
          part=${Parts.BODY}
          class=${Parts.BODY}
        >
          <slot name=${Slots.BODY}></slot>
        </div>
        <div
          part=${Parts.ACTION_BAR}
          class=${Parts.ACTION_BAR}
        >
          <slot name=${Slots.ACTION_BAR}></slot>
        </div>
      </div>
    `;
  }
}
