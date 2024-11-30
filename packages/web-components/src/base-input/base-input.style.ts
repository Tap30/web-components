import { css } from "lit";

export default css`
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
    font-family: var(--tap-sys-font-family);

    display: flex;
    flex-direction: column;

    gap: var(--tap-sys-spacing-4);
  }

  /* .control {
    height: 3.25rem;
    padding: 0 var(--tap-sys-spacing-6);

    gap: var(--tap-sys-spacing-4);

    background-color: var(--input-control-bg-color);
    border-radius: var(--tap-sys-radius-3);
    border: var(--tap-sys-stroke-2) solid var(--input-control-border-color);
  } */

  /* .control input,
  .control textarea {
    caret-color: var(--tap-sys-color-surface-accent);
  } */

  /* .root:not(.no-control-focus-border) .control:focus-within {
    background-color: var(--tap-sys-color-surface-secondary);
    border: var(--tap-sys-stroke-2) solid
      var(--tap-sys-color-border-inverse-primary);
  } */
`;
