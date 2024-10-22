import { isShadowRoot, isWindow } from "./is";

export const getWindow = (node: Node | Window): Window => {
  if (!node) return window;

  if (!isWindow(node)) {
    const ownerDocument = node.ownerDocument;

    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
};

export const getDocumentElement = (node: Node | Window): HTMLElement =>
  (
    (node instanceof Node ? node.ownerDocument : node.document) ??
    window.document
  ).documentElement;

export const getNodeName = (node: Node | Window): string =>
  isWindow(node) ? "" : node ? (node.nodeName || "").toLowerCase() : "";

export const getParentNode = (node: Node): Node => {
  if (getNodeName(node) === "html") return node;

  return (
    // Step into the shadow DOM of the parent of a slotted node
    (<HTMLElement>node).assignedSlot ||
    // DOM Element detected
    node.parentNode ||
    // ShadowRoot detected
    (isShadowRoot(node) ? node.host : null) ||
    // Fallback
    getDocumentElement(node)
  );
};
