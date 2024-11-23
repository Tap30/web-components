import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
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

    font-family: var(--tap-sys-font-family);

    padding: var(--tap-sys-spacing-6) var(--tap-sys-spacing-8);
  }

  .icon {
    color: var(--tap-sys-color-content-secondary);

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

    margin-top: var(--tap-sys-spacing-8);
    margin-bottom: var(--tap-sys-spacing-8);
  }

  .title {
    color: var(--tap-sys-color-content-primary);
    font-size: var(--tap-sys-typography-headline-sm-size);
    font-weight: var(--tap-sys-typography-headline-sm-weight);
    line-height: var(--tap-sys-typography-headline-sm-height);
  }

  .description {
    margin-top: var(--tap-sys-spacing-4);

    color: var(--tap-sys-color-content-secondary);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
    line-height: var(--tap-sys-typography-body-md-height);
  }

  .title + .description {
    margin-top: var(--tap-sys-spacing-4);
  }
`;
