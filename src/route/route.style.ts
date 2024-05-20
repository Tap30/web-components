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

  [hidden] {
    display: none !important;
  }

  .container{
    display: flex;
    align-items: stretch;
    width: 100%;
    transition: background-color 0.3s;
    font-family: var(--tap-font-family, var(--tap-sys-font-family)), serif;
    background-color: var(--tap-row-background-color, var(--tap-palette-white));
  }

  .leading {
    padding: var(--tap-row-leading-vertical-padding, 0) var(--tap-row-leading-horizontal-padding, var(--tap-sys-spacing-4));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    padding: var(--tap-row-content-padding ,var(--tap-sys-spacing-4));
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .trailing {
    padding: var(--tap-row-trailing-vertical-padding, 0) var(--tap-row-trailing-horizontal-padding, var(--tap-sys-spacing-4));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #navigable {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([size="standard"]) .container {
    height: var(--tap-row-standard-height, var(--tap-sys-spacing-13));
  }

  :host([size="compact"]) .container {
    height: var(--tap-row-compact-height, var(--tap-sys-spacing-12));
  }

  .leading.hidden,
  .trailing.hidden {
    display: none;
  }

  :host(:not([navigable])) #navigable {
    display: none;
  }

  :host([navigable]) .container {
    cursor: pointer;
  }
`;
