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
  node instanceof ShadowRoot || node instanceof ShadowRoot;

export const contains = (parent: Element, child: Element): boolean => {
  if (parent.contains(child)) return true;

  const rootNode = child.getRootNode?.();

  // Fallback to custom implementation with Shadow DOM support
  if (rootNode && isShadowRoot(rootNode)) {
    let next: Node = child;

    do {
      if (next && parent === next) return true;

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
        !!(<HTMLAnchorElement>element).href &&
        (<HTMLAnchorElement>element).rel !== "ignore"
      );
    case "area":
      return !!(<HTMLAreaElement>element).href;
    case "input":
      return (<HTMLInputElement>element).type !== "hidden";
    case "button":
    case "select":
    case "textarea":
      return !((<{ disabled?: boolean }>element).disabled ?? false);
    default: {
      const isCustomElement = element.localName.includes("-");

      if (!isCustomElement) return false;

      // If a custom element does not have a tabindex, it may still be focusable
      // if it delegates focus with a shadow root. We also need to check again if
      // the custom element is a disabled form control.
      if ((<{ disabled?: boolean }>element).disabled) return false;

      return element.shadowRoot?.delegatesFocus ?? false;
    }
  }
};

export const isActiveElement = (element: Element): boolean => {
  if (!document.activeElement) return false;

  if (document.activeElement === element) return true;
  if (element.contains(document.activeElement)) return true;

  return false;
};
