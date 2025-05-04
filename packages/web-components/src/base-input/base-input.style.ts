import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
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

export default styles;
