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
