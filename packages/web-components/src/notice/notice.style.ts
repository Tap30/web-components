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

    --notice-border-radius: var(--tap-sys-radius-3);
    --notice-padding: var(--tap-sys-spacing-6) var(--tap-sys-spacing-5);
    --notice-title-font-size: var(--tap-sys-typography-label-md-size);
    --notice-title-line-height: var(--tap-sys-typography-body-lg-height);
    --notice-title-font-weight: var(--tap-sys-typography-label-md-weight);
    --notice-description-font-size: var(--tap-sys-typography-body-sm-size);
    --notice-description-line-height: var(--tap-sys-typography-body-lg-height);
    --notice-description-font-weight: var(--tap-sys-typography-body-sm-weight);
    --notice-align-items: flex-start;
    --notice-icon-color: var(--tap-sys-color-content-on-inverse);
    --notice-title-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-inverse-primary);
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

    --button-custom-overlay-color: var(--tap-sys-color-surface-overlay-light);
  }

  .root.standard {
    --notice-border-radius: var(--tap-sys-radius-3);
    --notice-padding: var(--tap-sys-spacing-6) var(--tap-sys-spacing-5);

    --notice-title-font-size: var(--tap-sys-typography-label-md-size);
    --notice-title-line-height: var(--tap-sys-typography-body-lg-height);
    --notice-title-font-weight: var(--tap-sys-typography-label-md-weight);

    --notice-description-font-size: var(--tap-sys-typography-body-sm-size);
    --notice-description-line-height: var(--tap-sys-typography-body-lg-height);
    --notice-description-font-weight: var(--tap-sys-typography-body-sm-weight);

    --notice-align-items: flex-start;
  }

  .root.compact {
    min-height: 36px;
    --notice-border-radius: var(--tap-sys-radius-full);
    --notice-padding: var(--tap-sys-spacing-2) var(--tap-sys-spacing-4);

    --notice-title-font-size: var(--tap-sys-typography-body-sm-size);
    --notice-title-line-height: var(--tap-sys-typography-body-sm-height);
    --notice-title-font-weight: var(--tap-sys-typography-body-sm-weight);

    --notice-description-font-size: var(--tap-sys-typography-body-sm-size);
    --notice-description-line-height: var(--tap-sys-typography-body-sm-height);
    --notice-description-font-weight: var(--tap-sys-typography-body-sm-weight);

    --notice-align-items: center;
  }

  .root.compact.dismissable {
    --notice-padding: var(--tap-sys-spacing-2) var(--tap-sys-spacing-4)
      var(--tap-sys-spacing-2) var(--tap-sys-spacing-2);
  }

  .root.icon-artwork.standard {
    --notice-justify-content: flex-start;
  }

  .content {
    margin: 0;
    padding: 0 var(--tap-sys-spacing-5);
    overflow: hidden;
    flex-grow: 1;
  }

  .artwork {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    justify-content: var(--notice-justify-content, center);

    color: var(--notice-icon-color);
  }

  .title {
    display: block;

    font-size: var(--notice-title-font-size);
    line-height: var(--notice-title-line-height);
    font-weight: var(--notice-title-font-weight);

    color: var(--notice-title-color);

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    margin: 0;
    padding: 0;
  }

  .description {
    display: block;

    font-size: var(--notice-description-font-size);
    line-height: var(--notice-description-line-height);
    font-weight: var(--notice-description-font-weight);

    color: var(--notice-description-color, var(--notice-title-color));

    margin: 0;
    padding: 0;
  }

  .description ::slotted(p) {
    margin: 0;
  }

  .dismiss svg {
    color: var(--notice-title-color);
  }

  .actions {
    padding-top: var(--tap-sys-spacing-5);
    display: flex;
    gap: var(--tap-sys-spacing-5);
  }

  .root.inverse.high {
    --notice-icon-color: var(--tap-sys-color-content-on-inverse);
    --notice-title-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-inverse-primary);
  }
  .root.inverse.low {
    --notice-icon-color: var(--tap-sys-color-content-primary);
    --notice-title-color: var(--tap-sys-color-content-primary);
    --notice-background-color: var(--tap-sys-color-surface-primary);
  }

  .root.success.high {
    --notice-icon-color: var(--tap-sys-color-content-on-inverse);
    --notice-title-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-positive);
  }
  .root.success.low {
    --notice-icon-color: var(--tap-sys-color-content-positive);
    --notice-title-color: var(--tap-sys-color-content-primary);
    --notice-background-color: var(--tap-sys-color-surface-positive-light);
    --notice-description-color: var(--tap-sys-color-content-secondary);
  }

  .root.warning.high {
    --notice-icon-color: var(--tap-sys-color-content-primary);
    --notice-title-color: var(--tap-sys-color-content-primary);
    --notice-background-color: var(--tap-sys-color-surface-warning);
    --notice-description-color: var(--tap-sys-color-content-secondary);
  }
  .root.warning.low {
    --notice-icon-color: var(--tap-sys-color-content-warning);
    --notice-title-color: var(--tap-sys-color-content-primary);
    --notice-background-color: var(--tap-sys-color-surface-warning-light);
    --notice-description-color: var(--tap-sys-color-content-secondary);
  }

  .root.error.high {
    --notice-icon-color: var(--tap-sys-color-content-on-inverse);
    --notice-title-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-negative);
  }
  .root.error.low {
    --notice-icon-color: var(--tap-sys-color-content-negative);
    --notice-title-color: var(--tap-sys-color-content-primary);
    --notice-background-color: var(--tap-sys-color-surface-negative-light);
    --notice-description-color: var(--tap-sys-color-content-secondary);
  }

  .root.info.high {
    --notice-icon-color: var(--tap-sys-color-content-on-inverse);
    --notice-title-color: var(--tap-sys-color-content-on-inverse);
    --notice-background-color: var(--tap-sys-color-surface-accent);
  }
  .root.info.low {
    --notice-icon-color: var(--tap-sys-color-content-accent);
    --notice-title-color: var(--tap-sys-color-content-primary);
    --notice-background-color: var(--tap-sys-color-surface-accent-light);
    --notice-description-color: var(--tap-sys-color-content-secondary);
  }

  .root.success.high .actions {
    --button-custom-background: var(--tap-palette-green-500);
    --button-custom-color: var(--notice-title-color);
    --button-disabled-background: var(--tap-sys-color-surface-disabled);
    --button-disabled-color: var(--tap-sys-color-content-disabled);
  }
  .root.success.low .actions {
    --button-custom-background: var(--tap-palette-green-100);
    --button-custom-color: var(--notice-title-color);
  }

  .root.warning.high .actions {
    --button-custom-background: var(--tap-palette-yellow-200);
    --button-custom-color: var(--notice-title-color);
  }
  .root.warning.low .actions {
    --button-custom-background: var(--tap-palette-yellow-200);
    --button-custom-color: var(--notice-title-color);
  }

  .root.error.high .actions {
    --button-custom-background: var(--tap-palette-red-500);
    --button-custom-color: var(--notice-title-color);
  }
  .root.error.low .actions {
    --button-custom-background: var(--tap-palette-red-100);
    --button-custom-color: var(--notice-title-color);
  }

  .root.info.high .actions {
    --button-custom-background: var(--tap-palette-blue-500);
    --button-custom-color: var(--notice-title-color);
  }
  .root.info.low .actions {
    --button-custom-background: var(--tap-palette-blue-100);
    --button-custom-color: var(--notice-title-color);
  }
`;
