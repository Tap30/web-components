import { css } from "lit";

export default css`
  .root.sm {
    height: var(--tap-button-sm-height, var(--tap-sys-spacing-9));
    padding: 0 var(--tap-button-sm-padding, var(--tap-sys-spacing-5));
  }

  .root.md {
    height: var(--tap-button-md-height, var(--tap-sys-spacing-10));
    padding: 0 var(--tap-button-md-padding, var(--tap-sys-spacing-6));
  }

  .root.lg {
    height: var(--tap-button-lg-height, var(--tap-sys-spacing-11));
    padding: 0 var(--tap-button-lg-padding, var(--tap-sys-spacing-8));
  }
`;
