import "../button/icon-button";

import { html, LitElement, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../internals";
import {
  contains,
  getRenderRootSlot,
  isElementFocusable,
  waitAMicrotask,
} from "../utils";
import { Slots } from "./constants";
import { HideEvent, ShowEvent } from "./events";
import { close, error, info, success, warning } from "./icons";

export class Snackbar extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Sets the text of the snackbar.
   */
  @property()
  public text = "";

  /**
   * Determines whether the snackbar is open or not.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * The color of the snackbar, indicating the type of message.
   * Defaults to `inverse`.
   */
  @property()
  public color: "success" | "error" | "info" | "warning" | "inverse" =
    "inverse";

  /**
   * Indicates whether the snackbar can be dismissed.
   */
  @property({ type: Boolean })
  public dismissible = false;

  /**
   * The time before the snackbar automatically closes (in milliseconds).
   */
  @property({ type: Number })
  public duration: number = -1;

  @state()
  private _hasIconSlot = false;

  private _timeoutRef = -1;

  private _focusTarget: HTMLElement | null = null;

  private _ignoreFocusChanges = false;
  private _focusSent = false;

  constructor() {
    super();

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

  public override connectedCallback(): void {
    super.connectedCallback();

    if (this.open) this._attachGlobalEvents();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (!this.open) this._detachGlobalEvents();

    window.clearTimeout(this._timeoutRef);

    this._focusSent = false;
    this._focusTarget = null;
  }

  protected override updated(changed: PropertyValues<this>) {
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

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    const iconSlot = getRenderRootSlot(this.renderRoot, Slots.ICON);

    this._hasIconSlot = (iconSlot?.assignedNodes().length ?? 0) > 0;
  }

  private _calculateAutoHideDuration() {
    const wordsCount = this.text.split(" ").length;

    return wordsCount * 300 + 1250;
  }

  /**
   * Opens the snackbar if it is not already open.
   * Dispatches a cancelable ShowEvent ("show").
   */
  public show() {
    if (this.open) return;

    this.open = true;

    const eventAllowed = this.dispatchEvent(new ShowEvent());

    if (!eventAllowed) this.open = false;
  }

  /**
   * Closes the snackbar if it is currently open.
   * Dispatches a cancelable HideEvent ("hide").
   */
  public hide() {
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

    return html`<slot name=${Slots.ICON}></slot>`;
  }

  protected override render() {
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
