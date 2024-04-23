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

  .banner {
    padding: var(--tap-sys-spacing-6);
    background-color: var(--tap-banner-color-surface);
    border-radius: var(--tap-sys-radius-4);
    text-align: right;

    background-image: url(var(--tap-banner-background-image));
    background-position: left bottom;
    background-size: 30% 100%;
    background-repeat: no-repeat;

    margin: var(--tap-sys-spacing-4, --tap-sys-spacing-6);
  }

  .hero {
    border-radius: 0;
    margin: 0;
  }

  .banner h4 {
    color: var(--tap-banner-color-content);
    font-family: var(--tap-sys-typography-headline-xs-font);
    line-height: var(--tap-sys-typography-headline-xs-height);
    font-size: var(--tap-sys-typography-headline-xs-size);
    font-weight: var(--tap-sys-typography-headline-xs-weight);
    margin: 0;
  }

  .banner p {
    color: var(--tap-banner-color-content);
    font-family: var(--tap-sys-typography-body-xs-font);
    line-height: var(--tap-sys-typography-body-xs-height);
    font-size: var(--tap-sys-typography-body-xs-size);
    font-weight: var(--tap-sys-typography-body-xs-weight);
    margin: 0;
  }

  // TODO: remove style if not slotted
  .action {
    margin-top: var(--tap-sys-spacing-5);
  }

  // TODO: remove style if not slotted
  .extra {
    display: flex;
    margin-bottom: var(--tap-sys-spacing-4);
  }
`;
