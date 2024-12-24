import {
  html,
  type LitElement,
  type ReactiveController,
  type ReactiveControllerHost,
  type TemplateResult,
} from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { getDeepActiveElement, isElementFocusable } from "../dom";

type Host = ReactiveControllerHost & LitElement;

const TrapperTypes = {
  START: "start",
  END: "end",
} as const;

class FocusTrapper implements ReactiveController {
  private readonly _host: Host;

  private _isEnabled = true;
  private _ignoreFocusChanges = false;

  private readonly _resolveTreeRoot: () => HTMLElement | null;

  private _lastFocused: HTMLElement | null = null;

  constructor(host: Host, resolveTreeRoot: () => HTMLElement | null) {
    host.addController(this);

    this._host = host;
    this._resolveTreeRoot = resolveTreeRoot;

    this._handleDocumentFocus = this._handleDocumentFocus.bind(this);
  }

  public sendFocus() {
    if (!this._isEnabled) return;

    const [firstFocusableChild] = this._getFirstAndLastFocusableChildren();

    firstFocusableChild?.focus();
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

    firstFocusableChild?.focus();

    if (document.activeElement === this._lastFocused) {
      lastFocusableChild?.focus();
    }

    if (document.activeElement && !root.contains(document.activeElement)) {
      firstFocusableChild?.focus();
    }

    this._lastFocused = document.activeElement as HTMLElement | null;
  }

  public wrap(tree: TemplateResult, options?: { enabled: boolean }) {
    const { enabled = true } = options ?? {};

    this._isEnabled = enabled;

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
        tabindex=${enabled ? "0" : "-1"}
        style=${styles}
        data-trapper-type=${TrapperTypes.START}
      ></div>
      ${tree}
      <div
        aria-hidden="true"
        tabindex=${enabled ? "0" : "-1"}
        style=${styles}
        data-trapper-type=${TrapperTypes.END}
      ></div>
    `;
  }

  private _handleDocumentFocus(event: FocusEvent) {
    if (this._ignoreFocusChanges) return;
    if (!this._isEnabled) return;

    const root = this._resolveTreeRoot();

    if (!root) return;

    const target = event.target as HTMLElement;

    if (this._host.contains(target)) {
      if (target === this._host) {
        const activeElement = getDeepActiveElement(1);

        if (!activeElement) return;
        if (!root.contains(activeElement)) return this._trap(root);

        this._lastFocused = activeElement;
      } else this._lastFocused = target;
    } else this._trap(root);
  }

  public hostConnected() {
    document.addEventListener("focus", this._handleDocumentFocus, {
      capture: true,
    });
  }

  public hostDisconnected() {
    document.removeEventListener("focus", this._handleDocumentFocus, {
      capture: true,
    });
  }

  public hostUpdate() {}
  public hostUpdated() {}
}

export default FocusTrapper;
