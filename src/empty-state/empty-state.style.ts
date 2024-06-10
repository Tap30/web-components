import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: var(--tap-font-family, var(--tap-sys-font-family)), serif;
  }

  .leading {
    height: var(--tap-empty-state-leading-height, var(--tap-sys-spacing-12));
    width: var(--tap-empty-state-leading-width, var(--tap-sys-spacing-12));
    margin: var(--tap-empty-state-content-vertical-margin, var(--tap-sys-spacing-6))
      var(--tap-empty-state-content-horizontal-margin, 0);
  }

  .trailing {
    margin: var(--tap-empty-state-content-vertical-margin, var(--tap-sys-spacing-6))
      var(--tap-empty-state-content-horizontal-margin, 0);
  }

  .content {
    text-align: center;
    padding: var(--tap-empty-state-content-vertical-padding, var(--tap-sys-spacing-4))
      var(--tap-empty-state-content-horizontal-padding, var(--tap-sys-spacing-6));
  }
`;
