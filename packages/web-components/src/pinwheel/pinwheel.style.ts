import { css } from "lit";
import { FOCUS_RING_LINE, FOCUS_RING_OFFSET } from "../internals/index.ts";

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
    -webkit-user-select: none;
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

  .root.no-transition {
    scroll-behavior: unset;
  }

  .root:focus-visible {
    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }

  .container {
    width: 100%;

    display: flex;
    flex-direction: column;
  }

  .placeholder {
    height: 3rem;
    width: 100%;

    flex-shrink: 0;
  }
`;
