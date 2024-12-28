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
    display: block;
  }

  .root {
    display: flex;
    align-items: center;

    gap: var(--tapsi-spacing-3);
  }

  .step {
    --progress-indicator-step-background-color: var(
      --tapsi-color-surface-tertiary
    );

    height: 0.25rem;
    flex: 1;

    background-color: var(--progress-indicator-step-background-color);
  }

  .step.active {
    --progress-indicator-step-background-color: var(
      --tapsi-color-border-inverse-primary
    );
  }
`;
