import { isHTMLElement, isShadowRoot, isWindow } from "./is";

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

export const getBoundingClientRect = (
  element: Element,
  includeScale = false,
) => {
  const clientRect = element.getBoundingClientRect();

  let scaleX = 1;
  let scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX =
      element.offsetWidth > 0
        ? Math.round(clientRect.width) / element.offsetWidth || 1
        : 1;
    scaleY =
      element.offsetHeight > 0
        ? Math.round(clientRect.height) / element.offsetHeight || 1
        : 1;
  }

  return {
    width: clientRect.width / scaleX,
    height: clientRect.height / scaleY,
    top: clientRect.top / scaleY,
    right: clientRect.right / scaleX,
    bottom: clientRect.bottom / scaleY,
    left: clientRect.left / scaleX,
    x: clientRect.left / scaleX,
    y: clientRect.top / scaleY,
  };
};
