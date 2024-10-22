import "../icon-button";

import { html, LitElement, type PropertyValues } from "lit";
import { property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { KeyboardKeys } from "../internals";
import {
  AnimationController,
  clearSelection,
  createDisposableRefCallback,
  ResizeSensor,
  runAfterRepaint,
  type DisposableRefCallback,
} from "../utils";
import { inLerp } from "../utils/math";
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
  ResizeEvent,
} from "./events";
import { dismiss } from "./icons";

export class BottomSheet extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _open = false;

  @state()
  private _status: "opened" | "closed" | "opening" | "closing" | "expanded" =
    "closed";

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

  @property({ type: Boolean, attribute: "has-overlay" })
  public hasOverlay = true;

  @query(".root")
  private _root!: HTMLElement | null;

  @query(".container")
  private _container!: HTMLElement | null;

  @query(".grabber")
  private _grabber!: HTMLElement | null;

  @queryAssignedNodes({ slot: "header" })
  private _headerAssignedNodes!: Array<Node>;

  @queryAssignedNodes({ slot: "body" })
  private _bodyAssignedNodes!: Array<Node>;

  @queryAssignedNodes({ slot: "action-bar" })
  private _actionBarAssignedNodes!: Array<Node>;

  @state()
  private _initialDy = 0;

  @state()
  private _dragState = {
    dragging: false,
    dy: 0,
  };

  private _animationController = new AnimationController();
  private _rootRefCallback: DisposableRefCallback | undefined;

  private _resizeSensor!: ResizeSensor;

  constructor() {
    super();

    this._handleDragEnd = this._handleDragEnd.bind(this);
    this._handleDragStart = this._handleDragStart.bind(this);
    this._handleDragging = this._handleDragging.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);

    this._resizeSensor = new ResizeSensor(sizeDetails => {
      const { element, width, height } = sizeDetails;

      if (element === this._root) {
        this.dispatchEvent(new ResizeEvent({ width, height }));
      }
    }, 250);
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

    // Observe root element on mount
    this._rootRefCallback = createDisposableRefCallback(elememt => {
      this._resizeSensor.observe(elememt);

      return () => {
        this._resizeSensor.unobserve(elememt);
      };
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (!this.open) this._detachGlobalEvents();

    this._resizeSensor.disconnect();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("open")) {
      if (this.open) this._attachGlobalEvents();
      else this._detachGlobalEvents();
    }

    // Execute layout effects after the next repaint cycle.
    runAfterRepaint(() => {
      if (!this._root) return;

      const rect = this._root.getBoundingClientRect();
      const half = window.innerHeight * 0.5;

      // If the hight is less than 50vh
      if (rect.height < half) this._initialDy = 0;
      else this._initialDy = rect.height - half;
    });

    super.update(changedProperties);
  }

  private _getClientY(event: MouseEvent | TouchEvent) {
    return event.type === "touchmove"
      ? (event as TouchEvent).touches[0]?.clientY ?? 0
      : (event as MouseEvent).clientY;
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    if (event.key === KeyboardKeys.ESCAPE) {
      event.preventDefault();

      this.dispatchEvent(new CloseEvent());
    }
  }

  private _handleDragStart(event: MouseEvent | TouchEvent): void {
    this._dragState = {
      dy: this._initialDy,
      dragging: true,
    };

    this.dispatchEvent(new GrabStartEvent({ originEvent: event }));
  }

  private _handleDragEnd(event: MouseEvent | TouchEvent): void {
    // Calculate the movement percentage based on the initial and current drag positions
    const movePercent = inLerp(this._initialDy, 0, this._dragState.dy) * 100;

    // Reset state
    this._dragState = {
      dy: 0,
      dragging: false,
    };

    this.dispatchEvent(new GrabEndEvent({ originEvent: event }));

    if (movePercent < 0) {
      // Dispatch a CloseEvent if the movement percentage is negative
      this.dispatchEvent(new CloseEvent());
    } else if (movePercent >= 50) {
      // Expand if the movement percentage is 50% or higher
      console.log("expand");
    }
  }

  private _handleDragging(event: MouseEvent | TouchEvent): void {
    if (!this._dragState.dragging) return;

    // Clear any text selection
    clearSelection();

    if (!this._root || !this._grabber || !this._container) return;

    const rootRect = this._root.getBoundingClientRect();
    const grabberRect = this._grabber.getBoundingClientRect();

    let clientY = this._getClientY(event);

    clientY = clientY - rootRect.top;

    // Ignore if within the range of the grabber height
    if (0 <= clientY && clientY <= grabberRect.height) return;
    // Ignore if above the top boundary
    if (clientY < 0) return;

    this._dragState = {
      ...this._dragState,
      dy: clientY,
    };

    this.dispatchEvent(new GrabbingEvent({ originEvent: event }));
  }

  private async _toggleOpenState(openState: boolean) {
    // Skip transition if not connected or root not assigned
    if (!this.isConnected || !this._root) {
      this._status = openState ? "opened" : "closed";

      return;
    }

    const handleTransitionEnd = () => {
      // Finish the animation when transition ends
      this._animationController.finish();
    };

    this._root.addEventListener("transitionend", handleTransitionEnd);
    // Start the animation
    this._animationController.start();

    const cleanup = () => {
      // Finish the animation and remove the transition end event listener
      this._animationController.finish();
      this._root!.removeEventListener("transitionend", handleTransitionEnd);
    };

    const eventAllowed = this.dispatchEvent(
      openState ? new OpeningEvent() : new ClosingEvent(),
    );

    this._status = openState ? "opening" : "closing";

    // If the event is prevented, revert the open state and cleanup
    if (!eventAllowed) {
      this.open = !openState;
      this._status = !openState ? "opened" : "closed";

      return cleanup();
    }

    // Wait for the animation to complete
    const animationComplete = await this._animationController.promise;

    // If the animation is aborted, perform cleanup
    if (!animationComplete) return cleanup();

    this.dispatchEvent(openState ? new OpenedEvent() : new ClosedEvent());
    this._status = openState ? "opened" : "closed";

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
        @mousedown=${this._handleDragStart}
        @touchstart=${this._handleDragStart}
      ></div>
    `;
  }

  private _renderOverlay() {
    if (!this.hasOverlay) return null;

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

  private _calcContainerTransform() {
    const { dragging, dy } = this._dragState;

    if (dragging) return `translateY(${dy}px)`;
    if (!this.open) return undefined;

    return `translateY(${this._initialDy}px)`;
  }

  protected override render() {
    const rootClasses = classMap({
      open: this.open,
      dragging: this._dragState.dragging,
      expanded: this._status === "expanded",
      opened: this._status === "opened",
      closed: this._status === "closed",
      opening: this._status === "opening",
      closing: this._status === "closing",
      "has-body": this._bodyAssignedNodes.length > 0,
      "has-action-bar": this._actionBarAssignedNodes.length > 0,
    });

    const containerStyles = styleMap({
      transform: this._calcContainerTransform(),
      transition: this._dragState.dragging ? "none" : undefined,
    });

    return html`
      <div
        ${this._rootRefCallback}
        class="root ${rootClasses}"
        part="root"
        ?inert=${!this.open}
      >
        ${this._renderOverlay()}
        <div
          part="container"
          class="container"
          style=${containerStyles}
        >
          ${this._renderGrabber()}
          <div
            part="header"
            class="header"
          >
            ${this._renderHeading()}
            <slot name=${Slots.HEADER}></slot>
            ${this._renderDismissButton()}
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
