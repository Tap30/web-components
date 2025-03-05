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

  .root.auto {
    --empty-state-alignment: start;
  }

  .root.center {
    --empty-state-alignment: center;
  }

  .root {
    --empty-state-alignment: start;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: var(--tapsi-typography-font-family);

    padding: var(--tapsi-spacing-6) var(--tapsi-spacing-8);
  }

  .icon {
    color: var(--tapsi-color-content-secondary);

    display: flex;
    align-items: center;
    justify-items: center;

    width: 4rem;
    height: 4rem;
    max-width: 4rem;
    max-height: 4rem;
    font-size: 4rem;
  }

  .icon ::slotted(svg) {
    width: 4rem;
    height: 4rem;
    max-width: 4rem;
    max-height: 4rem;
  }

  .content {
    text-align: var(--empty-state-alignment);

    margin-top: var(--tapsi-spacing-8);
    margin-bottom: var(--tapsi-spacing-8);
  }

  .title {
    color: var(--tapsi-color-content-primary);
    font-size: var(--tapsi-typography-headline-sm-size);
    font-weight: var(--tapsi-typography-headline-sm-weight);
    line-height: var(--tapsi-typography-headline-sm-height);
  }

  .description {
    margin-top: var(--tapsi-spacing-4);

    color: var(--tapsi-color-content-secondary);
    font-size: var(--tapsi-typography-body-md-size);
    font-weight: var(--tapsi-typography-body-md-weight);
    line-height: var(--tapsi-typography-body-md-height);
  }

  .title + .description {
    margin-top: var(--tapsi-spacing-4);
  }
`;
