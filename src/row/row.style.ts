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

  .row-container{
    display: flex;
    align-items: stretch;
    width: 100%;
  }

  .row-leading {
    padding: var(--tap-sys-spacing-4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .row-content {
    padding: var(--tap-sys-spacing-4);
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .row-title {
    margin: 0;
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
  }

  .row-subtitle {
    margin: 0;
    color: var(--tap-palette-gray-500);
    font-size: var(--tap-sys-typography-body-sm-size);
    font-weight: var(--tap-sys-typography-body-sm-weight);

  }

  .row-trailing {
    padding: var(--tap-sys-spacing-4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([size="standard"]) .row-container {
    height: var(--tap-sys-spacing-13);
  }

  :host([size="compact"]) .row-container {
    height:var(--tap-sys-spacing-12);
  }

  :host .row-divider {
    margin: 0;
  }

  :host(:not([divider])) .row-divider {
    display: none;
  }

  .row-leading.hidden,
  .row-content.hidden,
  .row-trailing.hidden {
    display: none;
  }
`;
