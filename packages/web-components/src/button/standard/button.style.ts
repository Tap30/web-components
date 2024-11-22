import { css } from "lit";

export default css`
  .root.sm {
    --button-height: 2rem;
    --button-padding: 0 0.75rem;
  }

  .root.md {
    --button-height: 2.5rem;
    --button-padding: 0 1rem;
  }

  .root.lg {
    --button-height: 3rem;
    --button-padding: 0 1.5rem;
  }

  .root.sm .content {
    --button-line-height: var(--tap-sys-typography-label-sm-height);
    --button-font-size: var(--tap-sys-typography-label-sm-size);
    --button-font-weight: var(--tap-sys-typography-label-sm-weight);
  }

  .root.md .content {
    --button-line-height: var(--tap-sys-typography-label-sm-height);
    --button-font-size: var(--tap-sys-typography-label-sm-size);
    --button-font-weight: var(--tap-sys-typography-label-sm-weight);
  }

  .root.lg .content {
    --button-line-height: var(--tap-sys-typography-label-lg-height);
    --button-font-size: var(--tap-sys-typography-label-lg-size);
    --button-font-weight: var(--tap-sys-typography-label-lg-weight);
  }

  .root.loading .icon {
    visibility: visible;
  }
  .root.loading .content {
    visibility: hidden;
  }

  .root {
    height: var(--button-height);
    padding: var(--button-padding);
  }

  .content {
    line-height: var(--button-line-height);
    font-size: var(--button-font-size);
    font-weight: var(--button-font-weight);
    display: flex;
    align-items: center;
    z-index: 2;
  }
`;
