import {
  html,
  type LitElement,
  type ReactiveController,
  type ReactiveControllerHost,
  type TemplateResult,
} from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { contains, isElementFocusable } from "../dom";
import { runAfterRepaint } from "../event-loop-execution";

type Host = ReactiveControllerHost & LitElement;

const TrapperTypes = {
  START: "start",
  END: "end",
} as const;

const HOST_INSTANCE_DATA_ATTRIBUTE = "data-focus-trapper-host-instance";
const HOST_ENABLED_DATA_ATTRIBUTE = "data-focus-trapper-enabled";

class FocusTrapper implements ReactiveController {
  private readonly _host: Host;

  private _isEnabled = false;

  private readonly _resolveTreeRoot: () => HTMLElement | null;

  private _lastFocused: HTMLElement | null = null;
  private _ignoreFocusChanges = false;

  constructor(host: Host, resolveTreeRoot: () => HTMLElement | null) {
    host.addController(this);

    this._host = host;
    this._resolveTreeRoot = resolveTreeRoot;

    this._handleDocumentFocus = this._handleDocumentFocus.bind(this);
    this._handleStartTrapperFocus = this._handleStartTrapperFocus.bind(this);
    this._handleEndTrapperFocus = this._handleEndTrapperFocus.bind(this);
    this.sendFocus = this.sendFocus.bind(this);
  }

  public set enabled(isEnabled: boolean) {
    if (this._isEnabled === isEnabled) return;

    this._isEnabled = isEnabled;
    this._host.setAttribute(HOST_ENABLED_DATA_ATTRIBUTE, `${isEnabled}`);
  }

  public get enabled() {
    return this._isEnabled;
  }

  private _sendFocusToFirstFocusableChild() {
    if (!this._isEnabled) return;

    const element = this._getFirstAndLastFocusableChildren()[0];

    (document.activeElement as HTMLElement | null)?.blur();

    this._tryFocus(element);
  }

  private _sendFocusToLastFocusableChild() {
    if (!this._isEnabled) return;

    const element = this._getFirstAndLastFocusableChildren()[1];

    (document.activeElement as HTMLElement | null)?.blur();

    this._tryFocus(element);
  }

  public sendFocus() {
    this._sendFocusToFirstFocusableChild();
  }

  // TODO: Add good caching mechanism for top most instance
  private get _topMostInstance() {
    const instances = Array.from(
      document.querySelectorAll<Host>(`[${HOST_INSTANCE_DATA_ATTRIBUTE}]`),
    );

    if (instances.length === 0) return null;

    const enabledInstances = instances.filter(instance => {
      const isEnabledStr =
        instance.getAttribute(HOST_ENABLED_DATA_ATTRIBUTE) ?? "false";

      return isEnabledStr === "true";
    });

    if (enabledInstances.length === 0) return null;
    if (enabledInstances.length === 1) return enabledInstances[0]!;

    const { topMost } = enabledInstances.reduce<{
      topMost: Host | null;
      topMostZIndex: number;
    }>(
      (result, instance) => {
        const zIndex = getComputedStyle(instance).zIndex;

        if (zIndex === "auto") {
          if (result.topMostZIndex === -Infinity) {
            result.topMost = instance;

            return result;
          }
        } else {
          const zi = Number.parseInt(zIndex, 10) ?? 0;

          if (result.topMostZIndex <= zi) {
            result.topMostZIndex = zi;
            result.topMost = instance;

            return result;
          }
        }

        return result;
      },
      { topMost: null, topMostZIndex: -Infinity },
    );

    return topMost;
  }

  private _tryFocus(element: HTMLElement | null) {
    try {
      runAfterRepaint(() => {
        this._ignoreFocusChanges = true;

        element?.focus();

        this._ignoreFocusChanges = false;
      });
    } catch {
      /* Squelch! */
    }
  }

  private _gatherFocusableElements(root: Node) {
    const processNode = (node: Node, elements: Set<HTMLElement>) => {
      if (elements.has(node as HTMLElement)) return;

      if (node instanceof ShadowRoot) {
        gather(node, elements);

        return;
      }

      if (isElementFocusable(node as HTMLElement)) {
        elements.add(node as HTMLElement);

        return;
      }

      if (node instanceof HTMLSlotElement) {
        node.assignedNodes({ flatten: true }).forEach(assignedNode => {
          processNode(assignedNode, elements);
        });

        return;
      }

      if (node.hasChildNodes()) {
        gather(node, elements);

        return;
      }
    };

    const gather = (root: Node, elements: Set<HTMLElement>) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);

      walker.currentNode = walker.root;

      while (walker.nextNode()) {
        const child = walker.currentNode;

        processNode(child, elements);
      }
    };

    const focusableElements: Set<HTMLElement> = new Set();

    gather(root, focusableElements);

    return focusableElements;
  }

  private _getFirstAndLastFocusableChildren():
    | [HTMLElement, HTMLElement]
    | [null, null] {
    const root = this._resolveTreeRoot();

    if (!root) return [null, null];

    const focusableElements = this._gatherFocusableElements(root);

    if (focusableElements.size === 0) return [null, null];

    const elements = Array.from(focusableElements);

    return [elements[0]!, elements[elements.length - 1]!];
  }

  private _trap(root: HTMLElement) {
    const [firstFocusableChild, lastFocusableChild] =
      this._getFirstAndLastFocusableChildren();

    this._tryFocus(firstFocusableChild);

    if (document.activeElement === this._lastFocused) {
      this._tryFocus(lastFocusableChild);
    }

    if (document.activeElement && !contains(root, document.activeElement)) {
      (document.activeElement as HTMLElement).blur();
    }

    this._lastFocused = document.activeElement as HTMLElement | null;
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

  private _handleStartTrapperFocus(event: FocusEvent) {
    const root = this._resolveTreeRoot();

    const lastFocusedElement = (this._lastFocused ??
      event.relatedTarget) as HTMLElement | null;

    if (!root || !lastFocusedElement || !contains(root, lastFocusedElement)) {
      this._sendFocusToFirstFocusableChild();

      return;
    }

    this._sendFocusToLastFocusableChild();
  }

  private _handleEndTrapperFocus() {
    this._sendFocusToFirstFocusableChild();
  }

  private _handleDocumentFocus(event: FocusEvent) {
    if (!this._isEnabled) return;
    if (this._ignoreFocusChanges) return;
    if (this._topMostInstance !== this._host) return;

    const root = this._resolveTreeRoot();

    if (!root) return;

    const target = this._getActualTarget(event) as HTMLElement | null;

    if (!target) return;

    if (contains(root, target)) {
      this._lastFocused = target;
    } else this._trap(root);
  }

  public wrap(tree: TemplateResult) {
    const styles = styleMap({
      position: "absolute",
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      border: 0,
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
    });

    return html`
      <div
        aria-hidden="true"
        tabindex=${this._isEnabled ? "0" : "-1"}
        style=${styles}
        data-trapper
        data-trapper-type=${TrapperTypes.START}
        @focus=${this._handleStartTrapperFocus}
      ></div>
      ${tree}
      <div
        aria-hidden="true"
        tabindex=${this._isEnabled ? "0" : "-1"}
        style=${styles}
        data-trapper
        data-trapper-type=${TrapperTypes.END}
        @focus=${this._handleEndTrapperFocus}
      ></div>
    `;
  }

  public hostConnected() {
    this._host.setAttribute(HOST_INSTANCE_DATA_ATTRIBUTE, "");
    this._host.setAttribute(HOST_ENABLED_DATA_ATTRIBUTE, `${this.enabled}`);

    document.addEventListener("focusin", this._handleDocumentFocus);
  }

  public hostDisconnected() {
    this._host.removeAttribute(HOST_INSTANCE_DATA_ATTRIBUTE);
    this._host.removeAttribute(HOST_ENABLED_DATA_ATTRIBUTE);

    document.removeEventListener("focusin", this._handleDocumentFocus);
  }

  public hostUpdate() {}
  public hostUpdated() {}
}

export default FocusTrapper;
