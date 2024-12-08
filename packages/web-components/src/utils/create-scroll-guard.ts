/**
 * Calculates the width of the scrollbar.
 */
const getScrollbarWidth = () => {
  // Create dummy elements to measure scrollbar width
  const dummyParent = document.createElement("div");
  const dummyChild = document.createElement("div");
  let scrollbarWidth = 0;

  // Style the dummy parent to force scrollbars
  dummyParent.style.width = "10px";
  dummyParent.style.height = "10px";
  dummyParent.style.overflow = "scroll";
  dummyParent.style.position = "absolute";
  dummyParent.style.top = "-9999px";
  dummyParent.setAttribute("aria-hidden", "true");
  dummyParent.setAttribute("role", "presentation");

  // Style the dummy child
  dummyChild.style.width = "100px";
  dummyChild.style.height = "100px";

  // Append the child to the parent and add to the document body
  dummyParent.appendChild(dummyChild);
  document.body.appendChild(dummyParent);

  // Calculate the scrollbar width
  scrollbarWidth = dummyParent.offsetWidth - dummyParent.clientWidth;

  // Remove the dummy parent from the document body
  document.body.removeChild(dummyParent);

  return scrollbarWidth;
};

export type ScrollGuard = {
  enable: () => void;
  disable: () => void;
};

/**
 * Creates scroll guard controller.
 */
const createScrollGuard = (): ScrollGuard => {
  const scrollbarWidth = getScrollbarWidth();

  const cache = { paddingRight: "", overflow: "" };

  const enable = () => {
    // Cache the initial body styles
    cache.overflow = document.body.style.overflow;
    cache.paddingRight = document.body.style.paddingRight;

    const hasScroll = document.body.scrollHeight > document.body.clientHeight;

    document.body.style.overflow = "hidden";
    if (hasScroll) document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  const disable = () => {
    document.body.style.overflow = cache.overflow;
    document.body.style.paddingRight = cache.paddingRight;
  };

  return { enable, disable };
};

export default createScrollGuard;
