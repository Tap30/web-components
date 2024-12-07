import { css } from "lit";

export default css`
  * {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  .progressbar {
    display: flex;
    align-items: center;
    gap: var(--tap-sys-spacing-3);
  }

  .step {
    display: block;
    height: 0.25rem;
    flex: 1;

    --progress-indicator-step-background-color: var(
      --tap-sys-color-surface-tertiary
    );
    background-color: var(--progress-indicator-step-background-color);
  }

  .step.active {
    --progress-indicator-step-background-color: var(
      --tap-sys-color-border-inverse-primary
    );
  }
`;
