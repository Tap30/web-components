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

  :host {
    display: block;
  }

  .root {
    --banner-content-width: calc(100% - 7.75rem);

    background-color: var(--banner-color-surface);
    border-radius: var(--tap-sys-radius-4);

    vertical-align: middle;

    background-image: var(--banner-background-image);
    background-position: left bottom;
    background-size: contain;
    background-repeat: no-repeat;

    padding: var(--tap-sys-spacing-6);

    height: 9.25rem;
  }

  .root.hero {
    --banner-content-width: calc(100% - 7.5rem);

    border-radius: 0;

    height: auto;
    min-height: 10rem;
  }

  .heading {
    color: var(--banner-color-content);
    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-headline-xs-height);
    font-size: var(--tap-sys-typography-headline-xs-size);
    font-weight: var(--tap-sys-typography-headline-xs-weight);
  }

  .description {
    color: var(--banner-color-content);
    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-body-xs-height);
    font-size: var(--tap-sys-typography-body-xs-size);
    font-weight: var(--tap-sys-typography-body-xs-weight);
  }

  .heading + .description {
    margin-top: var(--tap-sys-spacing-3);
  }

  .content {
    display: flex;
    flex-direction: column;

    height: 100%;
    width: var(--banner-content-width);
  }

  .root.hero * + .action {
    margin-top: var(--tap-sys-spacing-5);
  }

  .action {
    margin-top: auto;
  }
`;
