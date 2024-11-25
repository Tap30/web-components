import { css } from "lit";

export default css`
  * {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    display: inline-flex;
    user-select: none;
    text-overflow: ellipsis;
    place-content: center;
    place-items: center;
    position: relative;
  }

  .root {
    position: relative;
    cursor: inherit;
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    vertical-align: middle;

    width: var(--tap-notice-width, 100%);
    height: var(--tap-notice-height, auto);
    gap: var(--tap-notice-gap, var(--tap-sys-spacing-5));
    border-radius: var(--tap-notice-radius, var(--tap-sys-radius-3));
    padding: var(--tap-notice-vertical-padding, var(--tap-sys-spacing-6))
      var(--tap-notice-horizontal-padding, var(--tap-sys-spacing-5));

    text-decoration: none;
    font: inherit;
    font-family: var(--tap-sys-font-family);

    color: var(--notice-color,);
    background-color: var(--notice-background-color,);
  }

  /* removing default margin of the div element*/
  :host .content-root {
    margin: 0;
    padding: 0;
  }

  /* removing default margin of the p element*/
  :host .content-root p {
    margin: 0;
    padding: 0;
  }

  :host .title {
    display: block;
    font-size: var(
      --tap-notice-title-font-size,
      var(--tap-sys-typography-label-md-size)
    );
    line-height: var(
      --tap-notice-title-line-height,
      var(--tap-sys-typography-label-md-height)
    );
    font-weight: var(
      --tap-notice-title-font-weight,
      var(--tap-sys-typography-label-md-weight)
    );
  }

  :host .message {
    display: block;
    font-size: var(
      --tap-notice-message-font-size,
      var(--tap-sys-typography-body-sm-size)
    );
    line-height: var(
      --tap-notice-message-line-height,
      var(--tap-sys-typography-body-sm-height)
    );
    font-weight: var(
      --tap-notice-message-font-weight,
      var(--tap-sys-typography-body-sm-weight)
    );
  }

  :host .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // TODO: fix
  .dismiss ::slotted(tap-icon-button) ::slotted(svg) {
    color: red;
  }

  ///* actions section is the adjacent sibling of the message */
  //:host .message + ::slotted(*) {
  //  margin-top: var(--tap-notice-actions-margin-top, var(--tap-sys-spacing-4));
  //}

  :host([variant="inverse"]) .root {
    color: var(
      --tap-notice-inverse-high-color,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-notice-inverse-high-bg-color,
      var(--tap-sys-color-surface-inverse-primary)
    );
  }
  :host([variant="inverse"][priority="low"]) .root {
    color: var(
      --tap-notice-inverse-low-color,
      var(--tap-sys-color-content-primary)
    );
    background-color: var(
      --tap-notice-inverse-low-bg-color,
      var(--tap-sys-color-surface-primary)
    );
  }

  .root.success.high {
    --notice-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-positive);
  }
  .root.success.low {
    --notice-color: var(--tap-sys-color-content-positive,);
    --notice-background-color: var(--tap-sys-color-surface-positive-light,);
  }

  .root.warning.high {
    --notice-color: var(--tap-sys-color-content-primary,);
    --notice-background-color: var(--tap-sys-color-surface-warning,);
  }
  .root.warning.low {
    --notice-color: var(--tap-sys-color-content-warning,);
    --notice-background-color: var(--tap-sys-color-surface-warning-light,);
  }

  .root.error.high {
    --notice-color: var(--tap-sys-color-content-on-inverse,);
    --notice-background-color: var(--tap-sys-color-surface-negative,);
  }
  .root.error.low {
    --notice-color: var(--tap-sys-color-content-negative,);
    --notice-background-color: var(--tap-sys-color-surface-negative-light,);
  }

  .root.info.high {
    --notice-color: var(--tap-sys-color-content-on-inverse,);
    --notice-background-color: var(--tap-sys-color-surface-accent,);
  }
  .root.info.low {
    --notice-color: var(--tap-sys-color-content-accent,);
    --notice-background-color: var(--tap-sys-color-surface-accent-light,);
  }

  ///
  .root.info.low ::slotted(tap-button)::part() {
    --notice-color: var(--tap-sys-color-content-accent,);
    --notice-background-color: var(--tap-sys-color-surface-accent-light,);
  }
  ////

  /* text style of the "low priority" mode is selected by a higher-priority selector */
  /* without this higher priority selector, the texts would be the same color as the icons */
  :host([priority="low"]) .root > div.content-root > p.message {
    color: var(
      --tap-notice-message-low-color,
      var(--tap-sys-color-content-secondary)
    );
  }
  :host([priority="low"]) .root > button.dismiss {
    color: var(
      --tap-notice-dismiss-low-color,
      var(--tap-sys-color-content-secondary)
    );
  }
  :host([priority="low"]) .root > div.content-root > p.title {
    color: var(
      --tap-notice-title-low-color,
      var(--tap-sys-color-content-primary)
    );
  }
`;
