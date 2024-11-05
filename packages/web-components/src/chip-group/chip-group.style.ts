import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    width: 100%;
  }

  .root {
    display: inline-flex;
    align-items: center;

    gap: var(--tap-sys-spacing-5);

    width: 100%;

    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .root::-webkit-scrollbar {
    display: none;
  }
`;
