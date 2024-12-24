import {
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals";
import {
  AnimationController,
  FocusTrapper,
  getRenderRootSlot,
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
   * Indicates whether the modal is open or not.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

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
  private _hasImage = false;

  @query("#root")
  private _root!: HTMLElement | null;

  @query("#container")
  private _container!: HTMLElement | null;

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
        this._lockScroll();

        if (!this._root) return;

        this._root.addEventListener(
          "transitionend",
          // Finish the animation when transition ends
          this._animationController.finish,
        );
        // Start the animation
        this._animationController.start();

        if (!this._animationController.promise) return;

        // Wait for the animation to complete
        this._animationController.promise
          .then(() => {
            this._focusTrapper.sendFocus();
          })
          .catch(() => void 0);
      } else {
        this._detachGlobalEvents();
        this._unlockScroll();
        this._previouslyFocusedElement?.focus();
      }
    }

    runAfterRepaint(() => {
      const imageSlot = getRenderRootSlot(this.renderRoot, Slots.IMAGE);

      if (!imageSlot) return;

      this._hasImage = imageSlot.assignedNodes().length > 0;
    });
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

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;
    if (event.key !== KeyboardKeys.ESCAPE) return;

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
          ?hidden=${!this._hasImage}
          aria-hidden="true"
          class="image"
          part="image"
        >
          <slot name=${Slots.IMAGE}></slot>
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
