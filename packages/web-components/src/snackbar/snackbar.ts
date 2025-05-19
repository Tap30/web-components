import { register as registerIconButton } from "../button/icon-button/index.ts";

import {
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals/index.ts";
import {
  contains,
  isElementFocusable,
  isSsr,
  waitAMicrotask,
} from "../utils/index.ts";
import { Slots } from "./constants.ts";
import { HideEvent, ShowEvent } from "./events.ts";
import { close, error, info, success, warning } from "./icons.ts";
import styles from "./snackbar.style.ts";

interface TapsiSnackbarEventMap extends HTMLElementEventMap {
  [HideEvent.type]: HideEvent;
  [ShowEvent.type]: ShowEvent;
}

/**
 * @summary The snackbar component for brief notifications of processes that have been or will be performed.
 *
 * @tag tapsi-snackbar
 *
 * @slot [icon] - The slot for icon when color is `inverse`.
 *
 * @fires {ShowEvent} show - Fires when the snackbar should be visible. (cancelable)
 * @fires {HideEvent} hide - Fires when the snackbar should be hidden. (cancelable)
 */
export class Snackbar extends LitElement {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

  /** @internal */
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** @internal */
  declare addEventListener: <K extends keyof TapsiSnackbarEventMap>(
    type: K,
    listener: (this: Snackbar, ev: TapsiSnackbarEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /** @internal */
  declare removeEventListener: <K extends keyof TapsiSnackbarEventMap>(
    type: K,
    listener: (this: Snackbar, ev: TapsiSnackbarEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;

  /**
   * Sets the text of the snackbar.
   *
   * @prop {string} text
   * @attr {string} text
   * @default ""
   */
  @property()
  public text = "";

  /**
   * Determines whether the snackbar is open or not.
   *
   * @prop {boolean} open
   * @attr {string} open
   * @default false
   */
  @property({ type: Boolean })
  public open = false;

  /**
   * The color of the snackbar, indicating the type of message.
   *
   * @prop {"success" | "error" | "info" | "warning" | "inverse"} color
   * @attr {"success" | "error" | "info" | "warning" | "inverse"} color
   * @default "inverse"
   */
  @property()
  public color: "success" | "error" | "info" | "warning" | "inverse" =
    "inverse";

  /**
   * Indicates whether the snackbar can be dismissed.
   *
   * @prop {boolean} dismissible
   * @attr {string} dismissible
   * @default false
   */
  @property({ type: Boolean })
  public dismissible = false;

  /**
   * The time before the snackbar automatically closes (in milliseconds).
   *
   * @prop {number} duration
   * @attr {string} duration
   * @default -1
   */
  @property({ type: Number })
  public duration: number = -1;

  @state()
  private _hasIconSlot = false;

  @queryAssignedNodes({ slot: Slots.ICON })
  private _iconSlotNodes!: Node[];

  private _timeoutRef = -1;

  private _focusTarget: HTMLElement | null = null;

  private _ignoreFocusChanges = false;
  private _focusSent = false;

  constructor() {
    super();

    registerIconButton();

    this._handleDocumentKeyDown = this._handleDocumentKeyDown.bind(this);
    this._handleDocumentFocus = this._handleDocumentFocus.bind(this);
  }

  private _attachGlobalEvents() {
    /* eslint-disable @typescript-eslint/no-misused-promises */
    document.addEventListener("keydown", this._handleDocumentKeyDown);
    document.addEventListener("focusin", this._handleDocumentFocus);
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  private _detachGlobalEvents() {
    /* eslint-disable @typescript-eslint/no-misused-promises */
    document.removeEventListener("keydown", this._handleDocumentKeyDown);
    document.addEventListener("focusin", this._handleDocumentFocus);
    /* eslint-enable @typescript-eslint/no-misused-promises */
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

    window.clearTimeout(this._timeoutRef);

    this._focusSent = false;
    this._focusTarget = null;
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (this.open) {
      const autoHideDuration =
        this.duration < 0 ? this._calculateAutoHideDuration() : this.duration;

      this._attachGlobalEvents();

      this._timeoutRef = window.setTimeout(() => {
        this.hide();
      }, autoHideDuration);
    } else {
      window.clearTimeout(this._timeoutRef);

      this._detachGlobalEvents();
      this._tryFocus(this._focusTarget);

      this._focusSent = false;
      this._focusTarget = null;
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

    this._handleIconSlotChange();
  }

  private _handleIconSlotChange() {
    if (!isSsr()) {
      this._hasIconSlot = this._iconSlotNodes.length > 0;
    }
  }

  private _calculateAutoHideDuration() {
    const wordsCount = this.text.split(" ").length;

    return wordsCount * 300 + 1250;
  }

  /**
   * Opens the snackbar if it is not already open.
   * Dispatches a cancelable ShowEvent ("show").
   */
  public show(): void {
    if (this.open) return;

    this.open = true;

    const eventAllowed = this.dispatchEvent(new ShowEvent());

    if (!eventAllowed) this.open = false;
  }

  /**
   * Closes the snackbar if it is currently open.
   * Dispatches a cancelable HideEvent ("hide").
   */
  public hide(): void {
    if (!this.open) return;

    this.open = false;

    const eventAllowed = this.dispatchEvent(new HideEvent());

    if (!eventAllowed) this.open = true;
  }

  private _renderDismiss() {
    if (!this.dismissible) return null;

    return html`
      <tapsi-icon-button
        part="dismiss"
        size="sm"
        variant="naked"
        label="Dismiss snackbar"
        id="dismiss"
        class="dismiss"
        @click=${() => this.hide()}
      >
        ${close}
      </tapsi-icon-button>
    `;
  }

  private _getActualTarget(event: Event) {
    if (!event.target) return null;

    return (
      ((event.target as HTMLElement).shadowRoot &&
      typeof event.composedPath === "function"
        ? event.composedPath()[0]
        : event.target) ?? null
    );
  }

  private _tryFocus(element: HTMLElement | null) {
    this._ignoreFocusChanges = true;

    try {
      element?.focus();
    } catch {
      // Squelch!
    }

    this._ignoreFocusChanges = false;
  }

  private _getFirstFocusableElement(treeRoot: HTMLElement) {
    const processNode = (node: Node): HTMLElement | null => {
      if (isElementFocusable(node as HTMLElement)) {
        return node as HTMLElement;
      }

      if (node instanceof ShadowRoot) {
        return findFocusableElement(node);
      }

      if (node instanceof HTMLSlotElement) {
        return (
          (node
            .assignedNodes({ flatten: true })
            .find(assignedNode => processNode(assignedNode)) as
            | HTMLElement
            | undefined) ?? null
        );
      }

      if (node.hasChildNodes()) {
        return findFocusableElement(node);
      }

      return null;
    };

    const findFocusableElement = (root: Node): HTMLElement | null => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);

      walker.currentNode = walker.root;

      while (walker.nextNode()) {
        const child = walker.currentNode;
        const focusableElement = processNode(child);

        if (focusableElement) return focusableElement;
      }

      return null;
    };

    return findFocusableElement(treeRoot);
  }

  private _handleDocumentFocus(event: FocusEvent) {
    if (!this.open) return;
    if (this._ignoreFocusChanges) return;

    const container = this.renderRoot.querySelector<HTMLElement>("#container");

    if (!container) return;

    const target = this._getActualTarget(event) as HTMLElement | null;

    // Exit if the target is not found or if it is inside the container
    if (!target) return;
    if (contains(container, target)) return;

    // If focus has already been sent and it's moving out of the snackbar,
    // try to re-focus the originally intended target element.
    if (this._focusSent) {
      this._tryFocus(this._focusTarget);
      this._focusTarget = null;

      return;
    }

    const focusableElement = this._getFirstFocusableElement(container);

    this._tryFocus(focusableElement);

    this._focusSent = true;

    if (focusableElement) {
      // Store the original target element that was supposed to receive focus,
      // before the focus was redirected to the snackbar.
      this._focusTarget = target;
    } else this._focusTarget = null;
  }

  private async _handleDocumentKeyDown(event: KeyboardEvent) {
    if (!this.open) return;
    if (event.key !== KeyboardKeys.ESCAPE) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    event.preventDefault();

    this.hide();
  }

  private _renderIcon() {
    if (this.color === "success") return success;
    if (this.color === "error") return error;
    if (this.color === "info") return info;
    if (this.color === "warning") return warning;

    return html`<slot
      @slotchange=${this._handleIconSlotChange}
      name=${Slots.ICON}
    ></slot>`;
  }

  protected override render(): TemplateResult {
    const rootClasses = classMap({
      root: true,
      open: this.open,
      [this.color]: true,
    });

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
          id="container"
          class="container"
          part="container"
          role="alert"
          aria-labelledby="text"
        >
          <div
            id="icon"
            class="icon"
            part="icon"
            ?hidden=${this.color === "inverse" && !this._hasIconSlot}
          >
            ${this._renderIcon()}
          </div>
          <div
            id="text"
            class="text"
            part="text"
          >
            ${this.text}
          </div>
          ${this._renderDismiss()}
        </div>
      </div>
    `;
  }
}
