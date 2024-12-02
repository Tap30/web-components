import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .root.disabled {
    cursor: not-allowed;
  }

  .root {
    direction: rtl;
    font-family: var(--tap-sys-font-family);

    display: flex;
    flex-direction: column;

    gap: var(--tap-sys-spacing-4);
  }
`;
