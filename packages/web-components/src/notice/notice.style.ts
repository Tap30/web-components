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
    min-width: 328px;
    padding: var(--tap-sys-spacing-6) var(--tap-sys-spacing-4);
  }

  .root {
    display: inline-flex;
    user-select: none;
    text-overflow: ellipsis;
    position: relative;
    cursor: inherit;
    align-items: var(--notice-align-items);
    justify-content: flex-start;
    vertical-align: middle;

    width: 100%;
    height: auto;
    border-radius: var(--notice-border-radius);
    padding: var(--notice-padding);

    text-decoration: none;
    font-family: var(--tap-sys-font-family);

    color: var(--notice-color);
    background-color: var(--notice-background-color);
  }

  .root.standard {
    --notice-border-radius: var(--tap-sys-radius-3);
    --notice-padding: var(--tap-sys-spacing-6) var(--tap-sys-spacing-5);

    --notice-title-font-size: var(--tap-sys-typography-label-md-size);
    --notice-title-line-height: var(--tap-sys-typography-label-md-height);
    --notice-title-font-weight: var(--tap-sys-typography-label-md-weight);

    --notice-message-font-size: var(--tap-sys-typography-body-sm-size);
    --notice-message-line-height: var(--tap-sys-typography-body-sm-height);
    --notice-message-font-weight: var(--tap-sys-typography-body-sm-weight);

    --notice-align-items: flex-start;
  }

  .root.compact {
    min-height: 36px;
    --notice-border-radius: var(--tap-sys-radius-full);
    --notice-padding: var(--tap-sys-spacing-2) var(--tap-sys-spacing-4);

    --notice-title-font-size: var(--tap-sys-typography-body-sm-size);
    --notice-title-line-height: var(--tap-sys-typography-body-sm-height);
    --notice-title-font-weight: var(--tap-sys-typography-body-sm-weight);

    --notice-message-font-size: var(--tap-sys-typography-body-sm-size);
    --notice-message-line-height: var(--tap-sys-typography-body-sm-height);
    --notice-message-font-weight: var(--tap-sys-typography-body-sm-weight);

    --notice-align-items: center;
  }

  .root.compact.dismissable {
    --notice-padding: var(--tap-sys-spacing-2) var(--tap-sys-spacing-4)
      var(--tap-sys-spacing-2) var(--tap-sys-spacing-2);
  }

  .content {
    margin: 0;
    padding: 0 var(--tap-sys-spacing-5);
    overflow: hidden;
    flex-grow: 1;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    display: block;

    font-size: var(--notice-title-font-size);
    line-height: var(--notice-title-line-height);
    font-weight: var(--notice-title-font-weight);

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    margin: 0;
    padding: 0;
  }

  .message {
    display: block;

    font-size: var(--notice-message-font-size);
    line-height: var(--notice-message-line-height);
    font-weight: var(--notice-message-font-weight);

    color: var(--notice-message-color, var(--notice-color));

    margin: 0;
    padding: 0;
  }

  .dismiss svg {
    color: var(--notice-color);
  }

  .actions {
    padding-top: var(--tap-sys-spacing-5);
  }

  .root.inverse.high {
    --notice-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-inverse-primary);
  }
  .root.inverse.low {
    --notice-color: var(--tap-sys-color-content-primary);
    --notice-background-color: var(--tap-sys-color-surface-primary);
  }

  .root.success.high {
    --notice-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-positive);

    --button-background: var(--tap-palette-green-100);
  }
  .root.success.low {
    --notice-color: var(--tap-sys-color-content-positive);
    --notice-background-color: var(--tap-sys-color-surface-positive-light);
    --notice-message-color: var(--tap-sys-color-content-secondary);

    --button-background: var(--tap-palette-green-500);
  }

  .root.warning.high {
    --notice-color: var(--tap-sys-color-content-primary);
    --notice-background-color: var(--tap-sys-color-surface-warning);
    --notice-message-color: var(--tap-sys-color-content-secondary);

    --button-background: var(--tap-palette-yellow-200);
  }
  .root.warning.low {
    --notice-color: var(--tap-sys-color-content-warning);
    --notice-background-color: var(--tap-sys-color-surface-warning-light);
    --notice-message-color: var(--tap-sys-color-content-secondary);

    --button-background: var(--tap-palette-yellow-200);
  }

  .root.error.high {
    --notice-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-negative);

    --button-background: var(--tap-palette-red-100);
  }

  .root.error.low {
    --notice-color: var(--tap-sys-color-content-negative);
    --notice-background-color: var(--tap-sys-color-surface-negative-light);
    --notice-message-color: var(--tap-sys-color-content-secondary);

    --button-background: var(--tap-palette-red-500);
  }

  .root.info.high {
    --notice-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-accent);

    --button-background: var(--tap-palette-blue-100);
  }
  .root.info.low {
    --notice-color: var(--tap-sys-color-content-accent);
    --notice-background-color: var(--tap-sys-color-surface-accent-light);
    --notice-message-color: var(--tap-sys-color-content-secondary);

    --button-background: var(--tap-palette-blue-500);
  }

  .root .actions ::slotted(tap-button)::part(root) {
    background-color: blue;
    color: white;
  }
`;
