import "../icon-button";

import { html, LitElement, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals";
import { AnimationController, getBoundingClientRect } from "../utils";
import { Slots } from "./constants";
import {
  CloseEvent,
  ClosingEvent,
  GrabEndEvent,
  GrabMoveEvent,
  GrabStartEvent,
  OpenEvent,
  OpeningEvent,
} from "./events";
import { dismiss } from "./icons";

export class BottomSheet extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _open = false;

  @property({ type: Boolean, reflect: true })
  set open(openState: boolean) {
    if (openState === this._open) return;

    this._open = openState;

    if (openState) void this._show();
    else void this._hide();
  }

  get open() {
    return this._open;
  }

  @property({ type: String, attribute: "heading-title" })
  public headingTitle?: string;

  @property({ type: String, attribute: "heading-description" })
  public headingDescription?: string;

  @property({ type: String, attribute: "dismiss-strategy" })
  public dismissStrategy: "grabber" | "button" = "grabber";

  @property({ type: String, attribute: "overlay-visibility" })
  public overlayVisibility: "auto" | "visible" | "hidden" = "visible";

  @state()
  private _isHeaderSlotted = false;

  private _isDragStarted = false;

  private _isAtScrollBottom = false;
  private _isAtScrollTop = false;

  private _animationController = new AnimationController();

  @query(".root")
  private _root!: HTMLElement | null;

  constructor() {
    super();

    this._handleDragEnd = this._handleDragEnd.bind(this);
    this._handleDragStart = this._handleDragStart.bind(this);
    this._handleDragging = this._handleDragging.bind(this);
    this._handleTransitionEnd = this._handleTransitionEnd.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  private _attachGlobalEvents() {
    if (this.dismissStrategy === "grabber") {
      document.addEventListener("mouseup", this._handleDragEnd);
      document.addEventListener("touchend", this._handleDragEnd);

      document.addEventListener("mousemove", this._handleDragging);
      document.addEventListener("touchmove", this._handleDragging);
    }

    document.addEventListener("keydown", this._handleKeyDown);
  }

  private _detachGlobalEvents() {
    if (this.dismissStrategy === "grabber") {
      document.removeEventListener("mouseup", this._handleDragEnd);
      document.removeEventListener("touchend", this._handleDragEnd);

      document.removeEventListener("mousemove", this._handleDragging);
      document.removeEventListener("touchmove", this._handleDragging);
    }

    document.removeEventListener("keydown", this._handleKeyDown);
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (this.open) this._attachGlobalEvents();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (!this.open) this._detachGlobalEvents();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("open")) {
      if (this.open) this._attachGlobalEvents();
      else this._detachGlobalEvents();
    }

    super.update(changedProperties);
  }

  private _emitOpenChange(newOpenState: boolean): void {
    if (newOpenState) {
      this.dispatchEvent(new OpenEvent());
    } else {
      this.dispatchEvent(new CloseEvent());
    }
  }

  private _renderDismissButton() {
    if (this.dismissStrategy !== "button") return null;

    return html`
      <tap-icon-button
        class="dismiss"
        part="dismiss"
        size="small"
        variant="ghost"
        @click=${() => this._emitOpenChange(!this.open)}
      >
        <span
          class="dismiss-icon"
          part="dismiss-icon"
          >${dismiss}</span
        >
      </tap-icon-button>
    `;
  }

  private _renderGrabber() {
    if (this.dismissStrategy !== "grabber") return null;

    return html`
      <div
        class="grabber"
        part="grabber"
      ></div>
    `;
  }

  private _renderOverlay() {
    if (this.overlayVisibility === "hidden") return null;

    return html`
      <div
        part="overlay"
        class="overlay"
        @click=${() => this._emitOpenChange(!this.open)}
      ></div>
    `;
  }

  private _renderHeadingTitle() {
    if (!this.headingTitle) return null;

    return html`
      <span
        class="heading-title"
        part="heading-title"
      >
        ${this.headingTitle}
      </span>
    `;
  }

  private _renderHeadingDescription() {
    if (!this.headingDescription) return null;

    return html`
      <span
        class="heading-description"
        part="heading-description"
      >
        ${this.headingDescription}
      </span>
    `;
  }

  private _renderHeading() {
    if (this._isHeaderSlotted) return null;

    return html`
      <div
        class="heading"
        part="heading"
      >
        ${this._renderHeadingTitle()}${this._renderHeadingDescription()}
      </div>
    `;
  }

  private _getClientY(event: MouseEvent | TouchEvent) {
    return event.type === "touchmove"
      ? (event as TouchEvent).touches[0]?.clientY ?? 0
      : (event as MouseEvent).clientY;
  }

  private _getRootBoundingRect() {
    if (!this._root) return null;

    return getBoundingClientRect(this._root);
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    if (event.key === KeyboardKeys.ESCAPE) {
      event.preventDefault();

      this._emitOpenChange(false);
    }
  }

  private _handleDragStart(event: MouseEvent | TouchEvent): void {
    this._isDragStarted = true;

    const grabStartEvent = new GrabStartEvent();

    this.dispatchEvent(grabStartEvent);
  }

  private _handleDragEnd(event: MouseEvent | TouchEvent): void {
    this._isDragStarted = false;

    const grabEndEvent = new GrabEndEvent();

    this.dispatchEvent(grabEndEvent);
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

    const grabMoveEvent = new GrabMoveEvent();

    this.dispatchEvent(grabMoveEvent);
  }

  private _handleHeaderSlotChange(event: Event): void {
    const slot = event.currentTarget as HTMLSlotElement;

    if (!slot) this._isHeaderSlotted = false;
    else this._isHeaderSlotted = slot.assignedNodes().length > 0;
  }

  private _handleTransitionEnd(event: TransitionEvent) {
    console.log(event);
    this._animationController.finish();
  }

  private async _show() {
    if (!this.isConnected) return;

    await this.updateComplete;

    if (!this._root) return;

    this._root.addEventListener("transitionend", this._handleTransitionEnd);
    this._animationController.start();

    const openingSuccess = this.dispatchEvent(new OpeningEvent());

    if (!openingSuccess) {
      this.open = false;
      this._animationController.finish();

      return;
    }

    const animationComplete = await this._animationController.promise;

    if (!animationComplete) {
      this.open = false;
      this._animationController.finish();

      return;
    }

    this.open = true;
    this._emitOpenChange(true);
    this._animationController.finish();
    this._root.removeEventListener("transitionend", this._handleTransitionEnd);
  }

  private async _hide() {
    if (!this.isConnected) return;

    await this.updateComplete;

    if (!this._root) return;

    this._root.addEventListener("transitionend", this._handleTransitionEnd);
    this._animationController.start();

    const closingSuccess = this.dispatchEvent(new ClosingEvent());

    if (!closingSuccess) {
      this._animationController.finish();

      return;
    }

    const animationComplete = await this._animationController.promise;

    if (!animationComplete) {
      this._animationController.finish();

      return;
    }

    this.open = false;
    this._emitOpenChange(false);
    this._root.removeEventListener("transitionend", this._handleTransitionEnd);
  }

  protected override render() {
    const rootClasses = classMap({
      open: this.open,
    });

    return html`
      <div
        class="root ${rootClasses}"
        part="root"
        ?inert=${!this.open}
      >
        ${this._renderOverlay()}
        <div
          part="container"
          class="container"
        >
          <div
            part="header"
            class="header"
          >
            ${this._renderGrabber()}
            <div
              class="header-container"
              part="header-container"
            >
              ${this._renderHeading()}
              <slot
                name=${Slots.HEADER}
                @slotchange="${this._handleHeaderSlotChange}"
              ></slot>
              ${this._renderDismissButton()}
            </div>
          </div>
          <div
            part="body"
            class="body"
          >
            <slot name=${Slots.BODY}></slot>
          </div>
          <div
            part="action-bar"
            class="action-bar"
          >
            <slot name=${Slots.ACTION_BAR}></slot>
          </div>
        </div>
      </div>
    `;
  }
}
