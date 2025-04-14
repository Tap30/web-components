import "../button/icon-button/index.ts";

import {
  DragGesture,
  rubberbandIfOutOfBounds,
  type DragConfig,
  type Handler,
} from "@use-gesture/vanilla";
import {
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { KeyboardKeys } from "../internals/index.ts";
import {
  AnimationController,
  clamp,
  FocusTrapper,
  isSsr,
  logger,
  redispatchEvent,
  runAfterRepaint,
  runImmediatelyBeforeRepaint,
  ScrollLocker,
  waitAMicrotask,
} from "../utils/index.ts";
import styles from "./bottom-sheet.style.ts";
import { SENTINEL_DEFAULT_SNAP_POINTS, Slots, Status } from "./constants.ts";
import {
  ClosedEvent,
  ClosingEvent,
  HideEvent,
  OpenedEvent,
  OpeningEvent,
  ShowEvent,
  SnappedEvent,
} from "./events.ts";
import { dismiss } from "./icons.ts";
import type { MetaData, SnapToCallbackArgument, StatusEnum } from "./types";

interface TapsiBottomSheetEventMap extends HTMLElementEventMap {
  [ClosedEvent.type]: ClosedEvent;
  [ClosingEvent.type]: ClosingEvent;
  [HideEvent.type]: HideEvent;
  [OpenedEvent.type]: OpenedEvent;
  [OpeningEvent.type]: OpeningEvent;
  [ShowEvent.type]: ShowEvent;
  [SnappedEvent.type]: SnappedEvent;
}

/**
 * @summary The Bottom sheet component that shows the secondary content anchored to the bottom of the screen.
 *
 * @tag tapsi-bottom-sheet
 *
 * @slot [header] - The slot for the header content.
 * @slot [body] - The slot for the main body content.
 * @slot [action-bar] - The slot for the action bar content.
 *
 * @fires {SnappedEvent} snapped - Fired when the bottom-sheet is snapped to a specific position.
 * @fires {OpeningEvent} opening - Fired when the bottom-sheet starts to open (cancelable).
 * @fires {ClosingEvent} closing - Fired when the bottom-sheet starts to close (cancelable).
 * @fires {OpenedEvent} opened - Fired when the bottom-sheet has fully opened.
 * @fires {ClosedEvent} closed - Fired when the bottom-sheet has fully closed.
 * @fires {HideEvent} hide - Fired when the bottom-sheet is hidden (cancelable).
 * @fires {ShowEvent} show - Fired when the bottom-sheet is shown (cancelable).
 */
export class BottomSheet extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /** @internal */
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiBottomSheetEventMap>(
    type: K,
    listener: (this: BottomSheet, ev: TapsiBottomSheetEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiBottomSheetEventMap>(
    type: K,
    listener: (this: BottomSheet, ev: TapsiBottomSheetEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;

  /**
   * Sets the heading title in a declarative-way.
   *
   * @prop {string} headingTitle
   * @attr {string} heading-title
   * @default ""
   */
  @property({ attribute: "heading-title" })
  public headingTitle = "";

  /**
   * Sets the heading description in a declarative-way.
   *
   * @prop {string} headingDescription
   * @attr {string} heading-description
   * @default ""
   */
  @property({ attribute: "heading-description" })
  public headingDescription = "";

  /**
   * Determines whether the grabber should be visible or not.
   *
   * @prop {boolean} hasGrabber
   * @attr {string} has-grabber
   * @default false
   */
  @property({ type: Boolean, attribute: "has-grabber" })
  public hasGrabber = false;

  /**
   * Determines whether the dismiss button should be visible or not.
   *
   * @prop {boolean} hasDismissButton
   * @attr {string} has-dismiss-button
   * @default false
   */
  @property({ type: Boolean, attribute: "has-dismiss-button" })
  public hasDismissButton = false;

  /**
   * Determines whether the action bar should be sticky or not.
   *
   * @prop {boolean} hasStickyActionBar
   * @attr {string} sticky-action-bar
   * @default false
   */
  @property({ type: Boolean, attribute: "sticky-action-bar" })
  public hasStickyActionBar = false;

  /**
   * Determines whether the header should be sticky or not.
   *
   * @prop {boolean} hasStickyHeader
   * @attr {string} sticky-header
   * @default false
   */
  @property({ type: Boolean, attribute: "sticky-header" })
  public hasStickyHeader = false;

  /**
   * Determines whether the bottom sheet should be expanded
   * by grabbing gesture.
   *
   * @prop {boolean} expandable
   * @attr {string} expandable
   * @default false
   */
  @property({ type: Boolean })
  public expandable = false;

  /**
   * The variant of the bottom sheet.
   *
   * @prop {"modal" | "inline"} variant
   * @attr {"modal" | "inline"} variant
   * @default "modal"
   */
  @property()
  public variant: "modal" | "inline" = "modal";

  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   *
   * @prop {string} label
   * @attr {string} label
   * @default ""
   */
  @property()
  public label = "";

  /**
   * Identifies the element (or elements) that labels the element.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   *
   * @props {string} labelledBy
   * @attr {string} labelledBy
   * @default ""
   */
  @property()
  public labelledBy = "";

  /**
   * Identifies the element that should get focused when bottom sheet opens.
   *
   * @props {string} focusTarget
   * @attr {string} focus-target
   * @default ""
   */
  @property({ attribute: "focus-target" })
  public focusTarget = "";

  @state()
  private _status: StatusEnum = Status.CLOSED;

  @state()
  private _height = 0;

  @state()
  private _expandGrabber = false;

  @state()
  private _isGrabbing = false;

  @state()
  private _isDismissClicksAllowed = true;

  @state()
  private get _preventContainerScrolling() {
    if (isSsr()) return true;

    if (!this.expandable) return false;

    return this._height < this._maxSnapPoint;
  }

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

  @queryAssignedNodes({ slot: Slots.HEADER })
  private _headerSlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.BODY })
  private _bodySlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.ACTION_BAR })
  private _actionBarSlotNodes!: Node[];

  private _open = false;
  private _snapPoints: null | number[] = null;

  private _previouslyFocusedElement: HTMLElement | null = null;

  private readonly _DRAG_GESTURE_DEFAULT_CONFIG: DragConfig = {
    filterTaps: true,
  };

  private readonly _animationController = new AnimationController();
  private readonly _scrollLocker = new ScrollLocker();
  private readonly _focusTrapper = new FocusTrapper(
    this,
    () => this._container,
  );

  private _dragGesture: DragGesture | null = null;

  private _init = false;

  constructor() {
    super();

    this._handleDocumentKeyDown = this._handleDocumentKeyDown.bind(this);
    this._handleDrag = this._handleDrag.bind(this);
    this._handleContainerScroll = this._handleContainerScroll.bind(this);
    this._handleContainerScrollEnd = this._handleContainerScrollEnd.bind(this);
    this._handleContainerTouchMove = this._handleContainerTouchMove.bind(this);
    this._handleContainerTouchStart =
      this._handleContainerTouchStart.bind(this);
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("expandable")) {
      this._dragGesture?.setConfig({
        ...this._DRAG_GESTURE_DEFAULT_CONFIG,
        enabled: this.expandable,
      });
    }

    if (changed.has("open")) {
      if (this.open) {
        this._previouslyFocusedElement =
          document.activeElement as HTMLElement | null;

        this._attachEvents();
      } else {
        this._detachEvents();
      }
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

    this._handleHeaderSlotChange();
    this._handleBodySlotChange();
    this._handleActionBarSlotChange();
  }

  private _handleHeaderSlotChange() {
    if (!isSsr()) {
      this._hasHeaderSlot = this._headerSlotNodes.length > 0;
    }
  }

  private _handleBodySlotChange() {
    if (!isSsr()) {
      this._hasBodySlot = this._bodySlotNodes.length > 0;
    }
  }

  private _handleActionBarSlotChange() {
    if (!isSsr()) {
      this._hasActionBarSlot = this._actionBarSlotNodes.length > 0;
    }
  }

  /** @internal */
  public override connectedCallback(): void {
    super.connectedCallback();

    if (this.open) this._attachEvents();
  }

  /** @internal */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (!this.open) this._detachEvents();
    this._scrollLocker.clearLocks();
  }

  private _lockScroll() {
    if (this.variant === "inline") return;
    if (!this._container) return;

    this._scrollLocker.lock(this._container);
  }

  private _unlockScroll() {
    if (this.variant === "inline") return;
    if (!this._container) return;

    this._scrollLocker.unlock(this._container);
  }

  private _attachEvents() {
    /* eslint-disable @typescript-eslint/no-misused-promises */
    document.addEventListener("keydown", this._handleDocumentKeyDown);

    if (this._container) {
      this._container.addEventListener("scroll", this._handleContainerScroll);
      this._container.addEventListener(
        "scrollend",
        this._handleContainerScrollEnd,
      );
      this._container.addEventListener(
        "touchmove",
        this._handleContainerTouchMove,
      );
      this._container.addEventListener(
        "touchstart",
        this._handleContainerTouchStart,
      );

      this._dragGesture = new DragGesture(this._container, this._handleDrag, {
        ...this._DRAG_GESTURE_DEFAULT_CONFIG,
        enabled: this.expandable,
      });
    }
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  private _detachEvents() {
    /* eslint-disable @typescript-eslint/no-misused-promises */
    document.removeEventListener("keydown", this._handleDocumentKeyDown);

    if (this._container) {
      this._container.removeEventListener(
        "scroll",
        this._handleContainerScroll,
      );
      this._container.removeEventListener(
        "scrollend",
        this._handleContainerScrollEnd,
      );
      this._container.removeEventListener(
        "touchmove",
        this._handleContainerTouchMove,
      );
      this._container.removeEventListener(
        "touchstart",
        this._handleContainerTouchStart,
      );

      this._dragGesture?.destroy();
    }
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  private get _headerHeight() {
    return (
      this.renderRoot.querySelector<HTMLElement>("#header")?.offsetHeight ?? 0
    );
  }

  private get _bodyHeight() {
    const h =
      this.renderRoot.querySelector<HTMLElement>("#body")?.offsetHeight ?? 0;

    if (this.hasGrabber) return h + this._grabberHeight;

    return h;
  }

  private get _actionBarHeight() {
    return (
      this.renderRoot.querySelector<HTMLElement>("#action-bar")?.offsetHeight ??
      0
    );
  }

  private get _grabberHeight() {
    return (
      this.renderRoot.querySelector<HTMLElement>("#grabber")?.offsetHeight ?? 0
    );
  }

  private get _maxSnapPoint() {
    const maxSnap = this.snapPoints[this.snapPoints.length - 1];

    if (typeof maxSnap === "undefined") {
      return this.defaultSnapPoints[this.defaultSnapPoints.length - 1]!;
    }

    return maxSnap;
  }

  private get _minSnapPoint() {
    const minSnap = this.snapPoints[0];

    if (typeof minSnap === "undefined") return this.defaultSnapPoints[0];

    return minSnap;
  }

  /**
   * The metadata of the bottom sheet.
   *
   * @prop {MetaData} metaData
   */
  public get metaData(): MetaData {
    return {
      actionBarHeight: this._actionBarHeight,
      bodyHeight: this._bodyHeight,
      headerHeight: this._headerHeight,
      height: this._height,
      snapPoints: this.snapPoints,
      totalHeight:
        this._actionBarHeight + this._bodyHeight + this._headerHeight,
    };
  }

  /**
   * An array containing two snap points.
   * - The first snap point is either the container's scroll height
   * or half the window's inner height, whichever is smaller.
   * - The second snap point is 90% of the window's inner height.
   *
   * @prop {[number, number]} defaultSnapPoints
   */
  public get defaultSnapPoints(): [number, number] {
    if (isSsr() || !this.isConnected || !this._container) {
      return SENTINEL_DEFAULT_SNAP_POINTS as [number, number];
    }

    const totalHeight =
      this._bodyHeight + this._headerHeight + this._actionBarHeight;

    return [
      Math.min(totalHeight, window.innerHeight / 2),
      0.9 * window.innerHeight,
    ] as [number, number];
  }

  /**
   * The snap points for bottom sheet to snap to.
   * Note that snap points will be sorted sorted, no matter
   * how to set it.
   *
   * @prop {number[]} snapPoints
   */
  @property({ attribute: false })
  public get snapPoints() {
    if (
      !this._snapPoints ||
      this._snapPoints === SENTINEL_DEFAULT_SNAP_POINTS
    ) {
      return this.defaultSnapPoints;
    }

    return this._snapPoints;
  }

  /** @internal */
  public set snapPoints(newSnapPoints: number[]) {
    this._snapPoints = [...newSnapPoints].sort((a, b) => a - b);
  }

  /**
   * Determines whether the bottom sheet should be open or not.
   *
   * @prop {boolean} open
   * @attr {string} open
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public set open(openState: boolean) {
    if (openState === this._open) return;

    const initialOpenState = !this.hasUpdated && openState && !this._open;

    const toggle = (shouldRender = false) => {
      this._open = openState;

      void this._toggleOpenState(openState);

      if (shouldRender) this.requestUpdate("open");
    };

    if (initialOpenState && !this._init) {
      this._init = true;
      void this.updateComplete.then(() => {
        runAfterRepaint(() => toggle(true));
      });
    } else toggle();
  }

  public get open() {
    return this._open;
  }

  private async _handleDocumentKeyDown(event: KeyboardEvent) {
    if (this.variant === "inline") return;
    if (!this.open) return;
    if (event.key !== KeyboardKeys.ESCAPE) return;
    // If not the active element (doesn't have focus), bail!
    // This is necessary to avoid weirdness in stacked modals
    // (BottomSheets, Modals, etc.).
    if (!this._focusTrapper.isTopMostInstance(this)) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    event.preventDefault();

    this.hide();
  }

  private _handleContainerScrollEnd(event: Event) {
    redispatchEvent(this, event);
  }

  private _handleContainerScroll(event: Event) {
    const element = event.currentTarget as HTMLElement;

    if (this._preventContainerScrolling) event.preventDefault();

    if (!this.hasStickyHeader && this.hasGrabber) {
      if (element.scrollTop >= 48) this._expandGrabber = true;
      else this._expandGrabber = false;
    }

    redispatchEvent(this, event);
  }

  private _handleContainerTouchMove(event: TouchEvent) {
    const element = event.currentTarget as HTMLElement;

    if (this._preventContainerScrolling) event.preventDefault();

    if (!this.hasStickyHeader && this.hasGrabber) {
      if (element.scrollTop >= 48) this._expandGrabber = true;
      else this._expandGrabber = false;
    }
  }

  private _handleContainerTouchStart(event: MouseEvent | TouchEvent) {
    const element = event.currentTarget as HTMLElement;

    // Prevent overscroll on Safari
    if (element.scrollTop < 0) {
      runImmediatelyBeforeRepaint(() => {
        element.style.overflow = "hidden";
        element.scrollTop = 0;
        element.style.removeProperty("overflow");
      });

      event.preventDefault();
    }
  }

  private _handleDrag(state: Parameters<Handler<"drag">>[0]) {
    const {
      cancel,
      pressed,
      first,
      last,
      tap,
      velocity,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      memo = this._height,
      direction: [, direction],
      movement: [, movementY],
    } = state;

    if (!this._container) return;

    const dy = -1 * movementY;

    // Filter out taps
    if (tap) return;

    const minSnap = this._minSnapPoint;
    const maxSnap = this._maxSnapPoint;

    const rawY = (memo as number) + dy;

    const predictedDistance = dy * velocity[1];
    const predictedY = clamp(rawY + predictedDistance * 2, minSnap, maxSnap);

    const downward = direction >= 0;

    if (
      this.variant === "modal" &&
      !pressed &&
      downward &&
      rawY + predictedDistance < minSnap / 2
    ) {
      cancel();

      this._isGrabbing = false;
      this.hide();

      return;
    }

    let newY: number = 0;

    if (!pressed) newY = predictedY;
    else {
      if (minSnap !== maxSnap) {
        newY = rubberbandIfOutOfBounds(rawY, 0, maxSnap, 0.55);
      } else if (rawY < minSnap) {
        newY = rubberbandIfOutOfBounds(rawY, minSnap, maxSnap * 2, 0.55);
      } else {
        newY = rubberbandIfOutOfBounds(rawY, minSnap / 2, maxSnap, 0.55);
      }
    }

    if (newY >= maxSnap) newY = maxSnap;
    if (memo === maxSnap && this._container.scrollTop > 0) newY = maxSnap;

    newY = clamp(newY, 0, maxSnap);

    if (first) {
      this._isGrabbing = true;

      if (this.variant === "modal") this._isDismissClicksAllowed = false;
    }

    if (last) {
      void this._snapTo(newY, false);

      this._isGrabbing = false;

      runAfterRepaint(() => {
        if (this.variant === "modal") this._isDismissClicksAllowed = true;
      });

      return;
    }

    this._height = newY;

    return memo as unknown;
  }

  private async _snapTo(snapPoint: number, strict: boolean) {
    if (!this._root) return Promise.resolve();

    let closestPoint: number;

    if (!strict) {
      const closest = [0, ...this.snapPoints].reduce(
        (result, currentPoint) => {
          const distance = Math.abs(snapPoint - currentPoint);

          if (result.minDistance > distance) {
            result.minDistance = distance;
            result.closestPoint = currentPoint;
          }

          return result;
        },
        {
          minDistance: Infinity,
          closestPoint: NaN,
        } as {
          minDistance: number;
          closestPoint: number;
        },
      );

      closestPoint = closest.closestPoint;
    } else closestPoint = snapPoint;

    if (Number.isNaN(closestPoint)) return Promise.resolve();

    if (this._status === Status.OPENING) {
      this._height = closestPoint;

      runAfterRepaint(() => {
        this._isDismissClicksAllowed = true;
      });

      return Promise.resolve();
    }

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "height") {
        // Finish the animation when height transition ends
        this._animationController.finish();
      }
    };

    const cleanup = () => {
      // Finish the animation and remove the transition end event listener
      this._animationController.finish();
      this._root!.removeEventListener("transitionend", handleTransitionEnd);
    };

    this._root.addEventListener("transitionend", handleTransitionEnd);

    // Start the animation
    this._animationController.start();
    this._height = closestPoint;

    runAfterRepaint(() => {
      this._isDismissClicksAllowed = true;
    });

    // Wait for the animation to complete
    const animationComplete = await this._animationController.promise;

    // If the animation is aborted, perform cleanup
    if (!animationComplete) return Promise.resolve(cleanup());

    this.dispatchEvent(new SnappedEvent({ snapPoint: closestPoint }));

    return Promise.resolve(cleanup());
  }

  /**
   * Strictly snaps to the provided or resolved snap point.
   *
   * @param {number | SnapToCallbackArgument} numberOrCallback
   */
  public strictSnapTo(numberOrCallback: number | SnapToCallbackArgument) {
    if (isSsr()) return;

    runImmediatelyBeforeRepaint(() => {
      const snapPoint =
        typeof numberOrCallback === "number"
          ? numberOrCallback
          : numberOrCallback(this.metaData);

      if (!this.open) {
        this._open = true;

        this.requestUpdate("open", false);

        void this._toggleOpenState(true, {
          point: snapPoint,
          strict: true,
        });
      } else void this._snapTo(snapPoint, true);
    });
  }

  /**
   * When given a number it'll find the closest snap point,
   * so you don't need to know the exact value.
   * Use the callback method to resolve the snap point.
   *
   * @param {number | SnapToCallbackArgument} numberOrCallback
   */
  public snapTo(numberOrCallback: number | SnapToCallbackArgument) {
    if (isSsr()) return;

    runImmediatelyBeforeRepaint(() => {
      const snapPoint =
        typeof numberOrCallback === "number"
          ? numberOrCallback
          : numberOrCallback(this.metaData);

      if (!this.open) {
        this._open = true;

        this.requestUpdate("open", false);

        void this._toggleOpenState(true, {
          point: snapPoint,
          strict: false,
        });
      } else void this._snapTo(snapPoint, false);
    });
  }

  /**
   * Opens the bottom sheet if it is not already open.
   * Dispatches a cancelable ShowEvent ("show").
   */
  public show() {
    if (this.open) return;

    this.open = true;

    const eventAllowed = this.dispatchEvent(new ShowEvent());

    if (!eventAllowed) this.open = false;
  }

  /**
   * Closes the bottom sheet if it is currently open.
   * Dispatches a cancelable HideEvent ("hide").
   */
  public hide() {
    if (!this.open) return;

    this.open = false;

    const eventAllowed = this.dispatchEvent(new HideEvent());

    if (!eventAllowed) this.open = true;
  }

  private async _toggleOpenState(
    openState: boolean,
    snapOpts?: { point: number; strict: boolean },
  ) {
    // Skip transition if not connected or elements are not assigned
    if (!this.isConnected || !this._root || !this._container) {
      this._status = openState ? Status.OPENED : Status.CLOSED;

      return;
    }

    const { point = null, strict = false } = snapOpts ?? {};

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "height") {
        // Finish the animation when height transition ends
        this._animationController.finish();
      }
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
      openState ? new OpeningEvent() : new ClosingEvent(),
    );

    // If the event is prevented, revert the open state and cleanup
    if (!eventAllowed) {
      this.open = !openState;

      this._status = !openState ? Status.OPENED : Status.CLOSED;

      return cleanup();
    }

    this._lockScroll();

    this._status = openState ? Status.OPENING : Status.CLOSING;

    const openToSnapPoint =
      point ?? this.snapPoints[0] ?? this.defaultSnapPoints[0];

    if (openState) {
      // It's opening, so we have to snap
      await this._snapTo(openToSnapPoint, strict);
    } else this._height = 0;

    // Wait for the animation to complete
    const animationComplete = await this._animationController.promise;

    // If the animation is aborted, perform cleanup
    if (!animationComplete) return cleanup();

    this.dispatchEvent(openState ? new OpenedEvent() : new ClosedEvent());

    this._status = openState ? Status.OPENED : Status.CLOSED;

    if (openState) {
      if (this.variant === "modal") this._focusTrapper.sendFocus();

      this.dispatchEvent(new SnappedEvent({ snapPoint: openToSnapPoint }));
    } else {
      this._unlockScroll();

      if (this.variant === "modal") {
        this._previouslyFocusedElement?.focus();
      }
    }

    this._expandGrabber = false;
    this._container.scrollTop = 0;

    cleanup();
  }

  private _renderDismissButton() {
    if (this.variant === "inline") return null;
    if (!this.hasDismissButton) return null;

    return html`
      <tapsi-icon-button
        class="dismiss"
        part="dismiss"
        size="sm"
        variant="ghost"
        label="Dismiss bottom sheet"
        @click=${() => {
          if (!this._isDismissClicksAllowed) return;

          this.hide();
        }}
      >
        <span
          class="dismiss-icon"
          part="dismiss-icon"
        >
          ${dismiss}
        </span>
      </tapsi-icon-button>
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
        aria-hidden="true"
        tabindex="-1"
        @click=${() => {
          if (!this._isDismissClicksAllowed) return;

          this.hide();
        }}
      ></div>
    `;
  }

  private _renderHeadingTitle() {
    if (!this.headingTitle) return null;

    return html`
      <span
        id="heading-title"
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
      height: `${this._height}px`,
      transition: this._isGrabbing ? "none" : undefined,
    });

    const containerClasses = classMap({
      container: true,
      "prevent-scroll": this._preventContainerScrolling,
    });

    const ariaLabelledBy = this.headingTitle
      ? "heading-title"
      : !this.label && this.labelledBy
        ? this.labelledBy
        : nothing;

    const ariaLabel = this.headingTitle ? nothing : this.label;

    if (!this.headingTitle && !this.label && !this.labelledBy) {
      logger(
        "Expected a valid `label` or `labelledby` attribute " +
          "when using `header` slot, received none.",
        "bottom-sheet",
        "warning",
      );
    }

    return html`
      <div
        id="container"
        part="container"
        class=${containerClasses}
        role=${this.variant === "modal" ? "dialog" : "region"}
        aria-modal=${this.variant === "modal"}
        aria-labelledby=${ariaLabelledBy}
        aria-label=${ariaLabel}
        style=${containerStyles}
      >
        ${this._renderGrabber()}
        <div
          id="header"
          part="header"
          class="header"
        >
          ${this._renderHeading()}
          <slot
            @slotchange=${this._handleHeaderSlotChange}
            name=${Slots.HEADER}
          ></slot>
          ${this._renderDismissButton()}
        </div>
        <div
          id="body"
          part=${Slots.BODY}
          class=${Slots.BODY}
          ?hidden=${!this._hasBodySlot}
        >
          <slot
            @slotchange=${this._handleBodySlotChange}
            name=${Slots.BODY}
          ></slot>
        </div>
        <div
          id="action-bar"
          part=${Slots.ACTION_BAR}
          class=${Slots.ACTION_BAR}
          ?hidden=${!this._hasActionBarSlot}
        >
          <slot
            @slotchange=${this._handleActionBarSlotChange}
            name=${Slots.ACTION_BAR}
          ></slot>
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
      "has-grabber": this.hasGrabber,
      "has-dismiss-btn": this.variant === "modal" && this.hasDismissButton,
      "has-body": this._hasBodySlot,
      "has-action-bar": this._hasActionBarSlot,
    });

    const containerTemplate = this._renderContainer();

    this._focusTrapper.enabled = this.variant === "modal" && this.open;
    this._focusTrapper.sendFocusTarget = this.focusTarget;

    const container: TemplateResult =
      this.variant === "modal"
        ? this._focusTrapper.wrap(containerTemplate)
        : containerTemplate;

    return html`
      <div
        id="root"
        class=${rootClasses}
        part="root"
        tabindex="-1"
        aria-hidden=${!this.open}
        ?inert=${!this.open}
      >
        ${this._renderOverlay()}${container}
      </div>
    `;
  }
}
