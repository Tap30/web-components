import { css } from "lit";

export default css`
  .root.sm {
    --button-content-padding: 0 var(--tap-sys-spacing-4);
    --button-content-font-size: var(--tap-sys-typography-label-sm-size);
    --button-content-line-height: var(--tap-sys-typography-label-sm-height);
    --button-content-font-weight: var(--tap-sys-typography-label-sm-weight);
    --button-min-width: 3.5rem;
  }

  .root.md {
    --button-content-padding: 0 var(--tap-sys-spacing-5);
    --button-content-font-size: var(--tap-sys-typography-label-sm-size);
    --button-content-line-height: var(--tap-sys-typography-label-sm-height);
    --button-content-font-weight: var(--tap-sys-typography-label-sm-weight);
    --button-min-width: 4.5rem;
  }

  .root.lg {
    --button-content-padding: 0 var(--tap-sys-spacing-7);
    --button-content-font-size: var(--tap-sys-typography-label-lg-size);
    --button-content-line-height: var(--tap-sys-typography-label-lg-height);
    --button-content-font-weight: var(--tap-sys-typography-label-lg-weight);
    --button-min-width: 6rem;
  }

  .root.loading .icon {
    visibility: visible;
  }

  .root.loading .body {
    visibility: hidden;
  }

  .root {
    min-width: var(--button-min-width);
  }

  .content {
    padding: var(--button-content-padding);
    font-size: var(--button-content-font-size);
    font-weight: var(--button-content-font-weight);
    line-height: var(--button-content-line-height);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
