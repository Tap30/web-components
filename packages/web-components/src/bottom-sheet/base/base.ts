import "../../button/icon-button";

import { html, isServer, LitElement, type PropertyValues } from "lit";
import { eventOptions, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { KeyboardKeys } from "../../internals";
import {
  AnimationController,
  clearSelection,
  createDisposableRefCallback,
  createScrollGuard,
  getRenderRootSlot,
  isResizeSensorSupported,
  logger,
  ResizeSensor,
  runAfterRepaint,
  throttle,
  type DisposableRefCallback,
} from "../../utils";
import { Slots } from "./constants";
import {
  ClosedEvent,
  CloseEvent,
  ClosingEvent,
  ExpandEvent,
  GrabbingEvent,
  GrabEndEvent,
  GrabStartEvent,
  OpenedEvent,
  OpeningEvent,
  ResizeEvent,
} from "./events";
import { dismiss } from "./icons";

export abstract class BaseBottomSheet extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _open = false;

  /**
   * Determines whether the bottom sheet should be open or not.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  set open(openState: boolean) {
    if (openState === this._open) return;

    this._open = openState;

    void this._toggleOpenState(openState);
  }

  get open() {
    return this._open;
  }

  /**
   * Sets the heading title in a declarative-way.
   */
  @property({ type: String, attribute: "heading-title" })
  public headingTitle?: string;

  /**
   * Sets the heading description in a declarative-way.
   */
  @property({ type: String, attribute: "heading-description" })
  public headingDescription?: string;

  /**
   * Determines whether the grabber should be visible or not.
   */
  @property({ type: Boolean, attribute: "has-grabber" })
  public hasGrabber = true;

  /**
   * Determines whether the dismiss button should be visible or not.
   */
  @property({ type: Boolean, attribute: "has-dismiss-button" })
  public hasDismissButton = false;

  /**
   * Determines whether the overlay should be visible or not.
   */
  @property({ type: Boolean, attribute: "has-overlay" })
  public hasOverlay = true;

  /**
   * Determines whether the action bar should be sticky or not.
   */
  @property({ type: Boolean, attribute: "sticky-action-bar" })
  public hasStickyActionBar = false;

  /**
   * The threshold for grab-end movement to trigger expansion or closure. (in pixels)
   *
   * @default 75
   */
  @property({ type: Number, attribute: "expansion-threshold" })
  public expansionThreshold = 75;

  @query("#root")
  protected _root!: HTMLElement | null;

  @query("#container")
  protected _container!: HTMLElement | null;

  @query("#grabber")
  protected _grabber!: HTMLElement | null;

  @state()
  private _hasHeaderSlot = false;

  @state()
  private _hasBodySlot = false;

  @state()
  private _hasActionBarSlot = false;

  @state()
  private _forceBlockContentScroll = false;

  @state()
  private _initialTranslateY = NaN;

  @state()
  private _isDragging = false;

  @state()
  private _dragInitialY = 0;

  @state()
  private _dragDy = 0;

  @state()
  private _expandGrabber = false;

  @state()
  private _dragInitiator: "grabber" | "sheet" | "none" = "none";

  @state()
  protected _containerStatus:
    | "opened"
    | "closed"
    | "opening"
    | "closing"
    | "expanded" = "closed";

  private _animationController = new AnimationController();
  private _rootRefCallback: DisposableRefCallback | undefined;
  private _scrollGuard = createScrollGuard();

  private _resizeSensor: ResizeSensor | null = null;

  constructor() {
    super();

    this._handleDragEnd = this._handleDragEnd.bind(this);
    this._handleDragStart = this._handleDragStart.bind(this);
    this._handleDragging = this._handleDragging.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);

    if (!isServer && isResizeSensorSupported()) {
      this._resizeSensor = new ResizeSensor(sizeDetails => {
        const { element, width, height } = sizeDetails;

        if (element === this._root) {
          this._updateInitialTranslateY();
          this.dispatchEvent(new ResizeEvent({ width, height }));
        }
      }, 250);
    }
  }

  private _attachGlobalEvents() {
    if (this.hasGrabber) {
      document.addEventListener("mouseup", this._handleDragEnd);
      document.addEventListener("touchend", this._handleDragEnd);

      document.addEventListener("mousemove", this._handleDragging);
      document.addEventListener("touchmove", this._handleDragging);
    }

    document.addEventListener("keydown", this._handleKeyDown);
  }

  private _detachGlobalEvents() {
    if (this.hasGrabber) {
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
      this._resizeSensor?.observe(elememt);

      return () => {
        this._resizeSensor?.unobserve(elememt);
      };
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (!this.open) this._detachGlobalEvents();

    this._resizeSensor?.disconnect();
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    // Execute layout effects after the next repaint cycle
    runAfterRepaint(() => {
      this._updateInitialTranslateY();

      if (!this._root) return;

      // Set dvh variable via JS for better compatibility
      this._root.style.setProperty(
        "--bottom-sheet-dvh",
        `${window.innerHeight / 100}px`,
      );

      if (changedProperties.has("open") && this.open) {
        if (this._initialTranslateY === 0) {
          // Initial content fits within 50vh, so the bottom sheet is opened and expanded
          this._containerStatus = "expanded";
          this.dispatchEvent(new ExpandEvent());
        }
      }

      const actionBarSlot = getRenderRootSlot(
        this.renderRoot,
        Slots.ACTION_BAR,
      );

      const bodySlot = getRenderRootSlot(this.renderRoot, Slots.BODY);
      const headerSlot = getRenderRootSlot(this.renderRoot, Slots.HEADER);

      this._hasActionBarSlot =
        (actionBarSlot?.assignedNodes() ?? []).length > 0;

      this._hasBodySlot = (bodySlot?.assignedNodes() ?? []).length > 0;
      this._hasHeaderSlot = (headerSlot?.assignedNodes() ?? []).length > 0;
    });
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);

    if (changedProperties.has("open")) {
      if (this.open) {
        this._attachGlobalEvents();
        this._scrollGuard.enable();
      } else {
        this._detachGlobalEvents();
        this._scrollGuard.disable();
      }
    }

    // Execute layout effects after the next repaint cycle
    runAfterRepaint(() => {
      this._updateInitialTranslateY();
      this._validateInputProps();
    });
  }

  private _validateInputProps() {
    const hasHeadingTitle = typeof this.headingTitle !== "undefined";
    const hasHeadingDesc = typeof this.headingDescription !== "undefined";

    if (this._hasHeaderSlot) {
      if (!hasHeadingTitle && !hasHeadingDesc) return;

      logger(
        [
          `Both \`${Slots.HEADER}\` slot and \`heading-title\` or \`heading-description\` are provided.`,
          "Please use only one to avoid conflicts.",
        ].join(" "),
        "bottom-sheet",
        "warning",
      );
    } else {
      if (hasHeadingTitle) return;

      logger(
        [
          "No header provided.",
          `Please opt-in by using either the \`heading-title\` property or the \`${Slots.HEADER}\` slot.`,
        ].join(" "),
        "bottom-sheet",
        "error",
      );
    }
  }

  private _updateInitialTranslateY() {
    if (!this._root) return;

    const rect = this._root.getBoundingClientRect();
    const half = window.innerHeight * 0.5;

    let initialTranslateY: number;

    // If the height is less than 50vh
    if (rect.height < half) initialTranslateY = 0;
    else initialTranslateY = rect.height - half;

    if (this._initialTranslateY !== initialTranslateY) {
      this._initialTranslateY = initialTranslateY;
    }
  }

  private _getClientY(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) return event.clientY;

    return event.touches[0]?.clientY ?? 0;
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    if (event.key === KeyboardKeys.ESCAPE) {
      event.preventDefault();

      this.dispatchEvent(new CloseEvent());
    }
  }

  private _handleContainerTouchStart(event: TouchEvent): void {
    this._dragInitiator = "sheet";
    this._handleDragStart(event);
  }

  private _handleGrabberGrab(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();

    this._dragInitiator = "grabber";
    this._handleDragStart(event);
  }

  private _handleDragStart(event: MouseEvent | TouchEvent): void {
    if (!this._root) return;

    let clientY = this._getClientY(event);
    const rootRect = this._root.getBoundingClientRect();

    clientY = clientY - rootRect.top;

    this._dragDy =
      this._containerStatus === "expanded" ? 0 : this._initialTranslateY;
    this._dragInitialY = clientY;
    this._isDragging = true;

    this.dispatchEvent(new GrabStartEvent({ originEvent: event }));
  }

  private _handleDragEnd(event: MouseEvent | TouchEvent): void {
    if (!this._isDragging) return;
    if (!this._root) return;

    const dy = this._dragDy;

    // Reset state
    this._dragDy = 0;
    this._dragInitialY = 0;
    this._isDragging = false;
    this._dragInitiator = "none";
    this._forceBlockContentScroll = false;

    this.dispatchEvent(new GrabEndEvent({ originEvent: event }));

    // Check movement threshold for expansion or closure
    if (dy <= -this.expansionThreshold) {
      this._containerStatus = "expanded";
      this.dispatchEvent(new ExpandEvent());
    } else if (dy >= this.expansionThreshold) {
      this.dispatchEvent(new CloseEvent());
    }
  }

  @eventOptions({ passive: false })
  private _handleDragging(event: MouseEvent | TouchEvent): void {
    if (!this._isDragging || this._dragInitiator === "none") return;

    // Clear any text selection
    clearSelection();

    if (!this._root || !this._grabber || !this._container) return;

    event.preventDefault();

    const rootRect = this._root.getBoundingClientRect();
    const clientY = this._getClientY(event);

    // Ignore if above the top boundary
    if (clientY <= rootRect.top) return;

    const relativeY = clientY - rootRect.top;
    const dy = relativeY - this._dragInitialY;

    if (this._containerStatus === "expanded") {
      const isScrollable =
        this._container.scrollHeight > this._container.clientHeight;

      if (isScrollable) {
        if (this._dragInitiator === "grabber") {
          // If drag initiated by the grabber, force block content scroll
          this._forceBlockContentScroll = true;
        } else {
          // Panning up means moving down
          const isPanningUp = dy < 0;
          // Panning down means moving up
          const isPanningDown = dy > 0;

          const cantGoLower =
            isPanningUp &&
            this._container.scrollTop + this._container.clientHeight >=
              this._container.scrollHeight;

          const cantGoHigher = isPanningDown && this._container.scrollTop <= 0;

          // If further scrolling is possible in either direction, prevent the container's transition
          if (!cantGoHigher && !cantGoLower) return;
          // Otherwise, enforce block content scroll and continue with the container transition
          this._forceBlockContentScroll = true;
        }
      }
    }

    // Ignore if above the top boundary for touch events
    if (this._initialTranslateY + dy <= 0) return;
    // Ignore if container is already expanded and
    // the drag movement is upwards or stationary
    if (this._containerStatus === "expanded" && dy <= 0) return;

    this._isDragging = true;
    this._dragDy = dy;

    this.dispatchEvent(new GrabbingEvent({ originEvent: event }));
  }

  private async _toggleOpenState(openState: boolean) {
    // Skip transition if not connected or root not assigned
    if (!this.isConnected || !this._root || !this._container) {
      this._containerStatus = openState ? "opened" : "closed";

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

    // If the event is prevented, revert the open state and cleanup
    if (!eventAllowed) {
      this.open = !openState;
      this._containerStatus = !openState ? "opened" : "closed";

      return cleanup();
    }

    this._containerStatus = openState ? "opening" : "closing";

    // Wait for the animation to complete
    const animationComplete = await this._animationController.promise;

    // If the animation is aborted, perform cleanup
    if (!animationComplete) return cleanup();

    this.dispatchEvent(openState ? new OpenedEvent() : new ClosedEvent());
    this._containerStatus = openState ? "opened" : "closed";

    if (!openState) {
      this._container.scrollTop = 0;
    } else if (this._initialTranslateY === 0) {
      // Initial content fits within 50vh, so the bottom sheet is opened and expanded
      this._containerStatus = "expanded";
      this.dispatchEvent(new ExpandEvent());
    }

    this._expandGrabber = false;

    cleanup();
  }

  private _handleContainerScroll = throttle((event: Event) => {
    if (!this._container) return;
    if (this._containerStatus !== "expanded") return;
    if (!this.hasGrabber) return;

    if (this._isDragging && this._dragInitiator === "grabber") {
      // Prevent default behavior if grabbing
      event.preventDefault();
    }

    // Toggle the expand state of the grabber based on scroll position
    if (this._container.scrollTop <= 0) {
      this._expandGrabber = false;
    } else this._expandGrabber = true;
  }, 170);

  private _renderDismissButton() {
    if (!this.hasDismissButton) return null;

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
    if (!this.hasGrabber) return null;

    return html`
      <div
        id="grabber"
        class="grabber"
        part="grabber"
      >
        <div
          class="grabber-event-capturer"
          @mousedown=${this._handleGrabberGrab}
          @touchstart=${this._handleGrabberGrab}
        ></div>
      </div>
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
    if (!this._hasHeaderSlot) return null;

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
    const initialTranslateY = Number.isNaN(this._initialTranslateY)
      ? 0
      : this._initialTranslateY;

    if (this._isDragging) {
      const initial =
        this._containerStatus === "expanded" ? 0 : initialTranslateY;

      if (this._dragDy === initial) return `translateY(${initial}px)`;

      return `translateY(${initial + this._dragDy}px)`;
    }

    if (!this.open) return undefined;
    if (this._containerStatus === "expanded") return "translateY(0)";

    return `translateY(${initialTranslateY}px)`;
  }

  protected override render() {
    const rootClasses = classMap({
      open: this.open,
      dragging: this._isDragging,
      expanded: this._containerStatus === "expanded",
      opened: this._containerStatus === "opened",
      closed: this._containerStatus === "closed",
      opening: this._containerStatus === "opening",
      closing: this._containerStatus === "closing",
      "expanded-grabber": this._expandGrabber,
      "sticky-actionbar": this.hasStickyActionBar,
      "has-body": this._hasBodySlot,
      "has-actionbar": this._hasActionBarSlot,
    });

    const containerStyles = styleMap({
      transform: this._calcContainerTransform(),
      overflow: this._forceBlockContentScroll ? "hidden" : undefined,
      transition: this._isDragging ? "none" : undefined,
    });

    return html`
      <div
        ${this._rootRefCallback}
        id="root"
        class="root ${rootClasses}"
        part="root"
        ?inert=${!this.open}
      >
        ${this._renderOverlay()}
        <div
          id="container"
          part="container"
          class="container"
          style=${containerStyles}
          @scroll=${this._handleContainerScroll}
          @touchstart=${this._handleContainerTouchStart}
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
            part=${Slots.BODY}
            class=${Slots.BODY}
          >
            <slot name=${Slots.BODY}></slot>
          </div>
          <div
            part=${Slots.ACTION_BAR}
            class=${Slots.ACTION_BAR}
          >
            <slot name=${Slots.ACTION_BAR}></slot>
          </div>
        </div>
      </div>
    `;
  }
}
