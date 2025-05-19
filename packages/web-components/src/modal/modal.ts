import {
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals/index.ts";
import {
  AnimationController,
  FocusTrapper,
  isSsr,
  runAfterRepaint,
  ScrollLocker,
  waitAMicrotask,
} from "../utils/index.ts";
import { Slots } from "./constants.ts";
import { HideEvent, ShowEvent } from "./events.ts";
import styles from "./modal.style.ts";

interface TapsiModalEventMap extends HTMLElementEventMap {
  [HideEvent.type]: HideEvent;
  [ShowEvent.type]: ShowEvent;
}

/**
 * @summary Display a modal dialog box, providing a title, content area, and action buttons.
 *
 * @tag tapsi-modal
 *
 * @slot [image] - The slot for imagery element.
 * @slot [action-bar] - The slot for actionbar element.
 *
 * @fires {ShowEvent} show - Fires when the modal should be visible. (cancelable)
 * @fires {HideEvent} hide - Fires when the modal should be hidden. (cancelable)
 */
export class Modal extends LitElement {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

  /** @internal */
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** @internal */
  declare addEventListener: <K extends keyof TapsiModalEventMap>(
    type: K,
    listener: (this: Modal, ev: TapsiModalEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /** @internal */
  declare removeEventListener: <K extends keyof TapsiModalEventMap>(
    type: K,
    listener: (this: Modal, ev: TapsiModalEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;

  /**
   * Sets the title of the modal.
   *
   * @prop {string} heading
   * @attr {string} heading
   * @default ""
   */
  @property()
  public heading = "";

  /**
   * Sets the description text for the modal.
   *
   * @prop {string} description
   * @attr {string} description
   * @default ""
   */
  @property()
  public description = "";

  /**
   * Determines the alignment of the modal's content.
   *
   * @prop {"start" | "center"} alignment
   * @attr {"start" | "center"} alignment
   * @default "start"
   */
  @property()
  public alignment: "start" | "center" = "start";

  @state()
  private _hasImageSlot = false;

  @queryAssignedNodes({ slot: Slots.IMAGE })
  private _imageSlotNodes!: Node[];

  @query("#root")
  private _root!: HTMLElement | null;

  @query("#container")
  private _container!: HTMLElement | null;

  private _open = false;

  private readonly _focusTrapper = new FocusTrapper(
    this,
    () => this._container,
  );

  private readonly _scrollLocker = new ScrollLocker();
  private readonly _animationController = new AnimationController();

  private _previouslyFocusedElement: HTMLElement | null = null;

  private _init = false;

  constructor() {
    super();

    this._handleDocumentKeyDown = this._handleDocumentKeyDown.bind(this);
  }

  /**
   * Determines whether the modal is open or not.
   *
   * @default false
   */
  @property({ type: Boolean })
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

  public get open(): boolean {
    return this._open;
  }

  private async _toggleOpenState(openState: boolean) {
    // Skip transition if not connected or elements are not assigned
    if (!this.isConnected || !this._root || !this._container) {
      return;
    }

    const handleTransitionEnd = () => {
      // Finish the animation when height transition ends
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

    this._lockScroll();

    // Wait for the animation to complete
    const animationComplete = await this._animationController.promise;

    // If the animation is aborted, perform cleanup
    if (!animationComplete) return cleanup();

    if (openState) {
      this._focusTrapper.sendFocus();
    } else {
      this._unlockScroll();

      this._previouslyFocusedElement?.focus();
    }

    cleanup();
  }

  private _attachGlobalEvents() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    document.addEventListener("keydown", this._handleDocumentKeyDown);
  }

  private _detachGlobalEvents() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    document.removeEventListener("keydown", this._handleDocumentKeyDown);
  }

  /** @internal */
  public override connectedCallback(): void {
    super.connectedCallback();

    if (this.open) this._attachGlobalEvents();
  }

  /** @internal */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (!this.open) this._detachGlobalEvents();
    this._scrollLocker.clearLocks();
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has("open")) {
      if (this.open) {
        this._previouslyFocusedElement =
          document.activeElement as HTMLElement | null;

        this._attachGlobalEvents();
      } else {
        this._detachGlobalEvents();
      }
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

    this._handleImageSlotChange();
  }

  private _handleImageSlotChange() {
    if (!isSsr()) {
      this._hasImageSlot = this._imageSlotNodes.length > 0;
    }
  }

  /**
   * Show the modal.
   */
  public show(): void {
    if (this.open) return;

    this.open = true;

    const eventAllowed = this.dispatchEvent(new ShowEvent());

    if (!eventAllowed) this.open = false;
  }

  /**
   * Hide the modal.
   */
  public hide(): void {
    if (!this.open) return;

    this.open = false;

    const eventAllowed = this.dispatchEvent(new HideEvent());

    if (!eventAllowed) this.open = true;
  }

  private _lockScroll() {
    if (!this._container) return;

    this._scrollLocker.lock(this._container);
  }

  private _unlockScroll() {
    if (!this._container) return;

    this._scrollLocker.unlock(this._container);
  }

  private _handleOverlayClick() {
    this.hide();
  }

  private async _handleDocumentKeyDown(event: KeyboardEvent) {
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

  private _renderContainer() {
    return html`
      <div
        id="container"
        class="container"
        part="container"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="title"
        aria-describedby="description"
      >
        <div
          ?hidden=${!this._hasImageSlot}
          aria-hidden="true"
          class="image"
          part="image"
        >
          <slot
            @slotchange=${this._handleImageSlotChange}
            name=${Slots.IMAGE}
          ></slot>
        </div>
        <div
          class="body"
          part="body"
        >
          <div
            id="title"
            class="title"
            part="title"
          >
            ${this.heading}
          </div>
          <div
            id="description"
            class="description"
            part="description"
          >
            ${this.description}
          </div>
        </div>
        <div
          class="actions"
          part="actions"
        >
          <slot name=${Slots.ACTION_BAR}></slot>
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const rootClasses = classMap({
      root: true,
      open: this.open,
      [this.alignment]: true,
    });

    this._focusTrapper.enabled = this.open;

    const container: TemplateResult = this._focusTrapper.wrap(
      this._renderContainer(),
    );

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
          aria-hidden="true"
          class="overlay"
          part="overlay"
          @click=${this._handleOverlayClick}
        ></div>
        ${container}
      </div>
    `;
  }
}
