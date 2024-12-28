import { css } from "lit";
import { FOCUS_RING_LINE, FOCUS_RING_OFFSET } from "../internals";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: inline-block;
    vertical-align: middle;
  }

  :host([disabled]) {
    cursor: not-allowed;
  }

  .root.disabled {
    pointer-events: none;
  }

  .root {
    width: 100%;
    height: 9rem;

    outline: none;
    user-select: none;

    overflow-y: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    scroll-behavior: smooth;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .root::-webkit-scrollbar {
    display: none;
  }

  .root:focus-visible {
    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }

  .container {
    width: 100%;

    display: flex;
    flex-direction: column;

    transition: transform 240ms ease;
  }

  .container.disable-transition {
    transition: none;
  }

  .placeholder {
    height: 3rem;
    width: 100%;

    flex-shrink: 0;
  }

  /* .item:first-child {
    padding-top: var(--tapsi-pinwheel-item-height, var(--tapsi-spacing-11));
  }

  .item:last-child {
    padding-bottom: var(--tapsi-pinwheel-item-height, var(--tapsi-spacing-11));
  } */
`;
