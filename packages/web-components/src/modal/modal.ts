import {
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals";
import {
  AnimationController,
  FocusTrapper,
  isActiveElement,
  isSSR,
  runAfterRepaint,
  ScrollLocker,
  waitAMicrotask,
} from "../utils";
import { Slots } from "./constants";
import { HideEvent, ShowEvent } from "./events";

export class Modal extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Sets the title of the modal.
   */
  @property()
  public heading = "";

  /**
   * Sets the description text for the modal.
   */
  @property()
  public description = "";

  /**
   * Determines the alignment of the modal's content.
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

  constructor() {
    super();

    this._handleDocumentKeyDown = this._handleDocumentKeyDown.bind(this);
  }

  /**
   * Determines whether the modal is open or not.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public set open(openState: boolean) {
    if (openState === this._open) return;

    const initialOpenState = !this.hasUpdated && openState && !this._open;

    const toggle = () => {
      this._open = openState;

      void this._toggleOpenState(openState);
    };

    if (initialOpenState) {
      runAfterRepaint(() => {
        const prevOpen = this._open;

        toggle();
        this.requestUpdate("open", prevOpen);
      });
    } else toggle();
  }

  public get open() {
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

  public override connectedCallback(): void {
    super.connectedCallback();

    if (this.open) this._attachGlobalEvents();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (!this.open) this._detachGlobalEvents();
  }

  protected override updated(changed: PropertyValues<this>) {
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

  protected override willUpdate(_changedProperties: PropertyValues<this>) {
    super.willUpdate(_changedProperties);

    this._handleImageSlotChange();
  }

  private _handleImageSlotChange() {
    if (!isSSR()) {
      this._hasImageSlot = this._imageSlotNodes.length > 0;
    }
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
    if (!isActiveElement(this)) return;

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

  protected override render() {
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
