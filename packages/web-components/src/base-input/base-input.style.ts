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
    font-family: var(--tapsi-typography-font-family);

    display: flex;
    flex-direction: column;

    gap: var(--tapsi-spacing-4);
  }
`;
