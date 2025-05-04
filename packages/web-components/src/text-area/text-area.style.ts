import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
  .control {
    height: 6.5rem;
    padding: var(--tapsi-spacing-5) var(--tapsi-spacing-6);

    align-items: flex-start;
  }

  .input {
    resize: none;
  }
`;

export default styles;
