import "../icon-button";

import { html, LitElement, type PropertyValues } from "lit";
import { property, query, queryAssignedNodes } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals";
import { AnimationController, getBoundingClientRect } from "../utils";
import { Slots } from "./constants";
import {
  ClosedEvent,
  CloseEvent,
  ClosingEvent,
  GrabbingEvent,
  GrabEndEvent,
  GrabStartEvent,
  OpenedEvent,
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

    void this._toggleOpenState(openState);
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

  @queryAssignedNodes({ slot: "header" })
  private _headerAssignedNodes!: Array<Node>;

  @queryAssignedNodes({ slot: "body" })
  private _bodyAssignedNodes!: Array<Node>;

  @queryAssignedNodes({ slot: "action-bar" })
  private _actionBarAssignedNodes!: Array<Node>;

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

      this.dispatchEvent(new CloseEvent());
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

    const grabMoveEvent = new GrabbingEvent();

    this.dispatchEvent(grabMoveEvent);
  }

  private async _toggleOpenState(openState: boolean) {
    if (!this.isConnected) return;

    await this.updateComplete;

    if (!this._root) return;

    const handleTransitionEnd = () => {
      this._animationController.finish();
    };

    this._root.addEventListener("transitionend", handleTransitionEnd);
    this._animationController.start();

    const cleanup = () => {
      this._animationController.finish();
      this._root!.removeEventListener("transitionend", handleTransitionEnd);
    };

    const eventAllowed = this.dispatchEvent(
      openState ? new OpeningEvent() : new ClosingEvent(),
    );

    // The event is prevented
    if (!eventAllowed) {
      this.open = !openState;

      return cleanup();
    }

    const animationComplete = await this._animationController.promise;

    // The animation is aborted
    if (!animationComplete) return cleanup();

    this.open = openState;
    this.dispatchEvent(openState ? new OpenedEvent() : new ClosedEvent());

    cleanup();
  }

  private _renderDismissButton() {
    if (this.dismissStrategy !== "button") return null;

    return html`
      <tap-icon-button
        class="dismiss"
        part="dismiss"
        size="small"
        variant="ghost"
        @click=${() => {
          this.dispatchEvent(new CloseEvent());
        }}
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
        @click=${() => {
          this.dispatchEvent(new CloseEvent());
        }}
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
    if (this._headerAssignedNodes.length > 0) return null;

    return html`
      <div
        class="heading"
        part="heading"
      >
        ${this._renderHeadingTitle()}${this._renderHeadingDescription()}
      </div>
    `;
  }

  protected override render() {
    const rootClasses = classMap({
      open: this.open,
      "has-body": this._bodyAssignedNodes.length > 0,
      "has-action-bar": this._actionBarAssignedNodes.length > 0,
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
              <slot name=${Slots.HEADER}></slot>
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
