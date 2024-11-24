import { css } from "lit";

export default css`
  .root.sm {
    --button-height: 2rem;
    --button-root-padding: 0 var(--tap-sys-spacing-3-1);
    --button-content-padding: 0 var(--tap-sys-spacing-4);
  }

  .root.md {
    --button-height: 2.5rem;
    --button-root-padding: 0 var(--tap-sys-spacing-4);
    --button-content-padding: 0 var(--tap-sys-spacing-5);
  }

  .root.lg {
    --button-height: 3rem;
    --button-root-padding: 0 var(--tap-sys-spacing-5);
    --button-content-padding: 0 var(--tap-sys-spacing-7);
  }

  .root.sm .body {
    --button-line-height: var(--tap-sys-typography-label-sm-height);
    --button-font-size: var(--tap-sys-typography-label-sm-size);
    --button-font-weight: var(--tap-sys-typography-label-sm-weight);
    flex-shrink: 0;
    max-width: 100%;
  }

  .root.md .body {
    --button-line-height: var(--tap-sys-typography-label-sm-height);
    --button-font-size: var(--tap-sys-typography-label-sm-size);
    --button-font-weight: var(--tap-sys-typography-label-sm-weight);
  }

  .root.lg .body {
    --button-line-height: var(--tap-sys-typography-label-lg-height);
    --button-font-size: var(--tap-sys-typography-label-lg-size);
    --button-font-weight: var(--tap-sys-typography-label-lg-weight);
  }

  .root.loading .icon {
    visibility: visible;
  }

  .root.loading .body {
    visibility: hidden;
  }

  .root {
    height: var(--button-height);
    padding: var(--button-root-padding);
  }

  .body {
    line-height: var(--button-line-height);
    font-size: var(--button-font-size);
    font-weight: var(--button-font-weight);
    display: flex;
    align-items: center;
    z-index: 2;
    width: 100%;
  }

  .content {
    padding: var(--button-content-padding);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
