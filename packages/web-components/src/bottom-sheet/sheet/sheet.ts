import "../../button/icon-button";

import {
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { KeyboardKeys } from "../../internals";
import {
  AnimationController,
  FocusTrapper,
  getRenderRootSlot,
  runAfterRepaint,
  ScrollLocker,
  waitAMicrotask,
} from "../../utils";
import { ContainerStatus, Slots } from "./constants";
import {
  ClosedEvent,
  ClosingEvent,
  HideEvent,
  OpenedEvent,
  ShowEvent,
  SnappedEvent,
} from "./events";
import { dismiss } from "./icons";
import type {
  ContainerStatusEnum,
  SnapPoint,
  SnapToCallbackArgument,
} from "./types";

export class BottomSheet extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Sets the heading title in a declarative-way.
   */
  @property({ attribute: "heading-title" })
  public headingTitle?: string;

  /**
   * Sets the heading description in a declarative-way.
   */
  @property({ attribute: "heading-description" })
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
   * Determines whether the action bar should be sticky or not.
   */
  @property({ type: Boolean, attribute: "sticky-action-bar" })
  public hasStickyActionBar = false;

  /**
   * Determines whether the header should be sticky or not.
   */
  @property({ type: Boolean, attribute: "sticky-header" })
  public hasStickyHeader = false;

  @property()
  public variant: "modal" | "inline" = "modal";

  @state()
  private _expandGrabber = false;

  @state()
  private _isDragging = false;

  @state()
  private _containerStatus: ContainerStatusEnum = ContainerStatus.CLOSED;

  @state()
  private _hasHeaderSlot = false;

  @state()
  private _hasBodySlot = false;

  @state()
  private _hasActionBarSlot = false;

  @query("#root")
  private _root!: HTMLElement | null;

  @query("#container")
  private _container!: HTMLElement | null;

  @query("#grabber")
  private _grabber!: HTMLElement | null;

  private _open = false;
  private _maxHeight = NaN;
  private _snapPoints: number[] = [];

  private _previouslyFocusedElement: HTMLElement | null = null;

  private readonly _animationController = new AnimationController();
  private readonly _focusTrapper = new FocusTrapper(this);
  private readonly _scrollLocker = new ScrollLocker();

  constructor() {
    super();
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("open")) {
      if (this.open) {
        this._previouslyFocusedElement =
          document.activeElement as HTMLElement | null;

        this._attachGlobalEvents();

        if (!this._container) return;

        this._scrollLocker.lock(this._container);
      } else {
        this._detachGlobalEvents();

        if (!this._container) return;

        this._scrollLocker.unlock(this._container);
      }
    }

    runAfterRepaint(() => {
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

  public override connectedCallback(): void {
    super.connectedCallback();

    if (this.open) this._attachGlobalEvents();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (!this.open) this._detachGlobalEvents();
  }

  private _attachGlobalEvents() {
    /* eslint-disable @typescript-eslint/no-misused-promises */
    document.addEventListener("keydown", this._handleDocumentKeyDown);
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  private _detachGlobalEvents() {
    /* eslint-disable @typescript-eslint/no-misused-promises */
    document.removeEventListener("keydown", this._handleDocumentKeyDown);
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  public static get DEFAULT_MAX_SNAP_POINT() {
    return 0;
  }

  public static get DEFAULT_MIN_SNAP_POINT() {
    return 0;
  }

  public static get DEFAULT_SNAP_POINTS() {
    return [
      BottomSheet.DEFAULT_MIN_SNAP_POINT,
      BottomSheet.DEFAULT_MAX_SNAP_POINT,
    ];
  }

  /**
   * By default the maxHeight is set to window.innerHeight to match 100vh, and responds to window resize events.
   * You can override it by giving maxHeight a number, just make sure you handle things like resize events when needed.
   */
  @property({ type: Number, attribute: "max-height" })
  public set maxHeight(newMaxHeight: number) {}

  public get maxHeight() {
    return this._maxHeight;
  }

  /**
   * Sets the snap points for bottom sheet to snap to.
   */
  @property({ attribute: false })
  public set snapPoints(snapPoints: number[]) {
    this._snapPoints = snapPoints;
  }

  public get snapPoints() {
    return this._snapPoints;
  }

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

  private async _handleDocumentKeyDown(event: KeyboardEvent) {
    if (!this.open) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;
    if (event.key !== KeyboardKeys.ESCAPE) return;

    event.preventDefault();

    this.hide();
  }

  /**
   * When given a number it'll find the closest snap point,
   * so you don't need to know the exact value.
   * Use the callback method to access what snap points you
   * can choose from.
   */
  public snapTo(numberOrCallback: SnapPoint | SnapToCallbackArgument) {}

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

  private _reset() {}

  private async _toggleOpenState(openState: boolean) {
    // Skip transition if not connected or elements are not assigned
    if (!this.isConnected || !this._root || !this._container) {
      this._containerStatus = openState
        ? ContainerStatus.OPENED
        : ContainerStatus.CLOSED;

      return;
    }

    const handleTransitionEnd = () => {
      // Finish the animation when transition ends
      this._animationController.finish();
    };

    const cleanup = () => {
      // Finish the animation and remove the transition end event listener
      this._animationController.finish();
      this._root!.removeEventListener("transitionend", handleTransitionEnd);
    };

    this._root.addEventListener("transitionend", handleTransitionEnd);
    // Start the animation
    this._animationController.start();

    const eventAllowed = this.dispatchEvent(
      openState ? new SnappedEvent() : new ClosingEvent(),
    );

    // If the event is prevented, revert the open state and cleanup
    if (!eventAllowed) {
      this.open = !openState;

      this._containerStatus = !openState
        ? ContainerStatus.OPENED
        : ContainerStatus.CLOSED;

      return cleanup();
    }

    this._containerStatus = openState
      ? ContainerStatus.OPENING
      : ContainerStatus.CLOSING;

    if (openState) {
      this.dispatchEvent(new SnappedEvent());
    }

    // Wait for the animation to complete
    const animationComplete = await this._animationController.promise;

    // If the animation is aborted, perform cleanup
    if (!animationComplete) return cleanup();

    this.dispatchEvent(openState ? new OpenedEvent() : new ClosedEvent());

    this._containerStatus = openState
      ? ContainerStatus.OPENED
      : ContainerStatus.CLOSED;

    // if (!openState) {
    //   this._container.scrollTop = 0;
    // } else if (this._initialTranslateY === 0) {
    //   // Initial content fits within 50vh, so the bottom sheet is opened and expanded
    //   this._containerStatus = "expanded";
    // }

    // this._expandGrabber = false;

    cleanup();
  }

  private _calcContainerTransform() {
    return "";
  }

  private _renderDismissButton() {
    if (!this.hasDismissButton) return null;

    return html`
      <tap-icon-button
        class="dismiss"
        part="dismiss"
        size="small"
        variant="ghost"
        label="Close bottom sheet"
        @click=${() => this.hide()}
      >
        <span
          class="dismiss-icon"
          part="dismiss-icon"
        >
          ${dismiss}
        </span>
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
        <div id="grabber-event-capturer"></div>
      </div>
    `;
  }

  private _renderOverlay() {
    if (this.variant === "inline") return null;

    return html`
      <div
        part="overlay"
        class="overlay"
        @click=${() => this.hide()}
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
    if (this._hasHeaderSlot) return null;

    return html`
      <div
        class="heading"
        part="heading"
      >
        ${this._renderHeadingTitle()}${this._renderHeadingDescription()}
      </div>
    `;
  }

  private _renderContainer() {
    const containerStyles = styleMap({
      transform: this._calcContainerTransform(),
      transition: this._isDragging ? "none" : undefined,
    });

    return html`
      <div
        id="container"
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
          part=${Slots.BODY}
          class=${Slots.BODY}
          ?hidden=${!this._hasBodySlot}
        >
          <slot name=${Slots.BODY}></slot>
        </div>
        <div
          part=${Slots.ACTION_BAR}
          class=${Slots.ACTION_BAR}
          ?hidden=${!this._hasActionBarSlot}
        >
          <slot name=${Slots.ACTION_BAR}></slot>
        </div>
      </div>
    `;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      open: this.open,
      "expanded-grabber": this._expandGrabber,
      "sticky-header": this.hasStickyHeader,
      "sticky-action-bar": this.hasStickyActionBar,
    });

    const containerTemplate = this._renderContainer();

    const container: TemplateResult =
      this.variant === "modal"
        ? this._focusTrapper.wrap(containerTemplate)
        : containerTemplate;

    return html`
      <div
        id="root"
        class=${rootClasses}
        part="root"
        aria-hidden=${!this.open}
        ?inert=${!this.open}
      >
        ${this._renderOverlay()}${container}
      </div>
    `;
  }
}
