export const isWindow = <T extends { toString?: () => string }>(
  input: unknown,
): input is Window =>
  !input ? false : (input as T).toString?.() === "[object Window]";

export const isElement = (input: unknown): input is Element =>
  input instanceof Element;

export const isHTMLElement = (input: unknown): input is HTMLElement =>
  input instanceof HTMLElement;

export const isHTMLInputElement = (input: unknown): input is HTMLInputElement =>
  input instanceof HTMLInputElement;

export const isNode = (input: unknown): input is Node => input instanceof Node;

export const isShadowRoot = (node: Node): node is ShadowRoot =>
  node instanceof ShadowRoot;

export const isHTMLDocument = (node: Node): node is Document =>
  node instanceof Document;

export const contains = (parent: Element, child: Element): boolean => {
  if (parent.contains(child)) return true;

  const rootNode = child.getRootNode();

  if (rootNode) {
    let next: Node = child;

    do {
      if (next && parent === next) return true;

      const shadowRoot = (next as unknown as HTMLElement).shadowRoot;

      if (shadowRoot && shadowRoot.contains(parent)) return true;

      next = next.parentNode || (next as unknown as ShadowRoot).host;
    } while (next);
  }

  return false;
};

export const isElementFocusable = (element: Element): boolean => {
  if (!element || !isHTMLElement(element)) return false;

  if (element.tabIndex < 0) return false;
  if (isHTMLInputElement(element) && element.disabled) return false;

  if (element.isContentEditable) return true;

  const nodeName = isWindow(element)
    ? ""
    : element
      ? (element.nodeName || "").toLowerCase()
      : "";

  switch (nodeName) {
    case "a":
      return (
        !!(element as HTMLAnchorElement).href &&
        (element as HTMLAnchorElement).rel !== "ignore"
      );
    case "area":
      return !!(element as HTMLAreaElement).href;
    case "input":
      return (element as HTMLInputElement).type !== "hidden";
    case "button":
    case "select":
    case "textarea":
      return !((element as { disabled?: boolean }).disabled ?? false);
    default: {
      const isCustomElement = element.localName.includes("-");

      if (!isCustomElement) return false;

      // If a custom element does not have a tabindex, it may still be focusable
      // if it delegates focus with a shadow root. We also need to check again if
      // the custom element is a disabled form control.
      if ((element as { disabled?: boolean }).disabled) return false;

      return element.shadowRoot?.delegatesFocus ?? false;
    }
  }
};

export const isActiveElement = (element: Element): boolean => {
  if (!document.activeElement) return false;
  if (document.activeElement === element) return true;
  if (!document.activeElement.shadowRoot) return false;

  const innerActiveElement = document.activeElement.shadowRoot.activeElement;

  if (!innerActiveElement) return false;
  if (document.activeElement === element) return true;

  return false;
};
