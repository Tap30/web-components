import { css } from "lit";

export default css`
  :host {
    --discount-card-outer-radius: var(--tapsi-radius-4, 16px);
    --discount-card-inner-radius: var(--tapsi-radius-3, 12px);
    --discount-card-outer-padding: 0 var(--tapsi-spacing-3, 4px)
      var(--tapsi-spacing-3, 4px);
    --discount-card-header-padding: var(--tapsi-spacing-4, 8px);
    --discount-card-header-title-padding: var(--tapsi-spacing-1, 8px) 0;
    --discount-card-badge-bg-color: transparent;
    --discount-card-badge-color: transparent;
    --discount-card-wrapper-border: var(
      --tapsi-color-border-primary,
      transparent
    );

    /* Variant color mappings */
    --discount-card-clay-bg: linear-gradient(
      90deg,
      var(--tapsi-palette-blue-100) 0%,
      var(--tapsi-palette-red-100) 100%
    );
    --discount-card-clay-color: var(--tapsi-color-content-primary);
    --discount-card-clay-badge-bg: var(--tapsi-palette-red-100);
    --discount-card-clay-badge-color: var(--tapsi-color-content-primary);
    --discount-card-whisper-bg: linear-gradient(
      90deg,
      #c6c0f9 0%,
      var(--tapsi-palette-blue-100) 100%
    );
    --discount-card-whisper-color: var(--tapsi-color-content-primary);
    --discount-card-whisper-badge-bg: var(--tapsi-palette-blue-100);
    --discount-card-whisper-badge-color: var(--tapsi-color-content-primary);
    --discount-card-azure-bg: linear-gradient(
      90deg,
      rgba(198, 192, 249, 0.4) 0%,
      var(--tapsi-palette-red-50) 100%
    );
    --discount-card-azure-color: var(--tapsi-color-content-primary);
    --discount-card-azure-badge-bg: var(--tapsi-palette-red-50);
    --discount-card-azure-badge-color: var(--tapsi-color-content-primary);
    --discount-card-flame-bg: linear-gradient(
      90deg,
      rgba(255, 213, 194, 0.7) 0%,
      var(--tapsi-palette-yellow-100) 100%
    );
    --discount-card-flame-color: var(--tapsi-color-content-primary);
    --discount-card-flame-badge-bg: var(--tapsi-palette-yellow-100);
    --discount-card-flame-badge-color: var(--tapsi-color-content-primary);
    --discount-card-grayscale-bg: var(--tapsi-color-surface-inverse-secondary);
    --discount-card-grayscale-color: var(--tapsi-palette-white);
    --discount-card-grayscale-badge-bg: var(
      --tapsi-color-surface-inverse-primary
    );
    --discount-card-grayscale-badge-color: var(--tapsi-palette-white);
    --discount-card-none-color: var(--tapsi-color-content-accent);
    --discount-card-none-bg: transparent;
    --discount-card-none-badge-bg: var(--tapsi-palette-blue-50);
    --discount-card-none-badge-color: var(--tapsi-color-content-accent);
  }

  *,
  *::before,
  *::after {
    font-family: var(--tapsi-typography-font-family);
    box-sizing: border-box;
    direction: rtl;
  }

  [hidden] {
    display: none !important;
  }

  .root {
    border-radius: var(--discount-card-outer-radius);
    padding: var(--discount-card-outer-padding);
  }

  .root.variant-none {
    --discount-card-badge-bg-color: var(--discount-card-none-badge-bg);
    --discount-card-badge-color: var(--tapsi-color-content-accent);
    background-color: var(--discount-card-none-bg);
    padding: var(--tapsi-spacing-0, 0px);

    .header {
      display: none;
    }
  }

  .root.variant-clay {
    --discount-card-badge-bg-color: var(--discount-card-clay-badge-bg);
    --discount-card-badge-color: var(--discount-card-clay-badge-color);
    background: var(--discount-card-clay-bg);

    .header {
      color: var(--discount-card-clay-color);
    }
  }

  .root.variant-whisper {
    --discount-card-badge-bg-color: var(--discount-card-whisper-badge-bg);
    --discount-card-badge-color: var(--tapsi-palette-black);
    background: var(--discount-card-whisper-bg);

    .header {
      color: var(--discount-card-whisper-color);
    }
  }

  .root.variant-azure {
    --discount-card-badge-bg-color: var(--discount-card-azure-badge-bg);
    --discount-card-badge-color: var(--tapsi-palette-black);
    background: var(--discount-card-azure-bg);

    .header {
      color: var(--discount-card-azure-color);
    }
  }

  .root.variant-flame {
    --discount-card-badge-bg-color: var(--discount-card-flame-badge-bg);
    --discount-card-badge-color: var(--discount-card-flame-badge-color);
    background: var(--discount-card-flame-bg);

    .header {
      color: var(--discount-card-flame-color);
    }
  }

  .root.variant-grayscale {
    --discount-card-badge-bg-color: var(--discount-card-grayscale-badge-bg);
    --discount-card-badge-color: var(--discount-card-grayscale-badge-color);
    background-color: var(--discount-card-grayscale-bg);

    .header {
      color: var(--discount-card-grayscale-color);
    }
  }

  .header {
    padding: var(--discount-card-header-padding);
    display: flex;
  }
  .header-title {
    padding: var(--discount-card-header-title-padding);
    flex: 1 0 auto;
  }

  .header-icon {
    height: 24px;
    width: 24px;
    flex: 0 0 24;
  }

  .wrapper {
    border: none;
    border-radius: var(--discount-card-inner-radius);
    background-color: var(--tapsi-palette-white);
    display: flex;
  }

  .wrapper.wrapper-border {
    border: 1px solid var(--discount-card-wrapper-border);
  }

  .side {
    padding: var(--tapsi-spacing-6, 16px) var(--tapsi-spacing-3);
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 0 0 82px;

    .badge-wrapper {
      position: relative;
      margin: 0 calc(var(--tapsi-spacing-3) * -1) 0 0;

      display: flex;
    }

    .badge-box {
      background-color: var(--discount-card-badge-bg-color);
      border-radius: var(--tapsi-spacing-3) 0 0 var(--tapsi-spacing-3);
      padding: var(--tapsi-spacing-2) var(--tapsi-spacing-4)
        var(--tapsi-spacing-2) var(--tapsi-spacing-5);
      color: var(--discount-card-badge-color);
      font-weight: var(--tapsi-typography-label-xxs-weight);
      font-size: var(--tapsi-typography-label-xxs-size);
      line-height: var(--tapsi-typography-label-xxs-height);
    }

    .badge-shape {
      position: absolute;
      left: 100%;
      top: 0;
      color: var(--discount-card-badge-bg-color);
    }

    /* border-left: 2px dashed var(--tapsi-color-border-primary); */
    .thumbnail-box {
      margin: var(--tapsi-spacing-9) auto 0;
      width: 60px;
      height: 60px;
    }

    .dashed-line {
      position: absolute;
      top: 0;
      height: 100%;
      left: -1;
      width: 2px;
      overflow: hidden;
      &::after {
        content: "";
        --b: 1px; /* border thickness */
        --s: 16px; /* size of the dashes */
        --c1: var(--tapsi-color-border-primary);
        --c2: var(--tapsi-palette-white);
        top: 0;
        height: 100%;
        left: -1px;
        padding: var(--b);
        position: absolute;
        background: repeating-conic-gradient(var(--c1) 0 25%, var(--c2) 0 50%) 0
          0 / var(--s) var(--s) round;
        mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        mask-composite: exclude;
      }
    }
  }

  .body {
    padding: var(--tapsi-spacing-6, 16px);
    flex: 1 0 auto;

    .title {
      font-weight: var(--tapsi-typography-label-sm-weight);
      font-size: var(--tapsi-typography-label-sm-size);
      line-height: var(--tapsi-typography-label-sm-height);
      color: var(--tapsi-palette-black);
    }

    .description {
      font-weight: var(--tapsi-typography-label-xs-weight);
      font-size: var(--tapsi-typography-label-xs-size);
      line-height: var(--tapsi-typography-label-xs-height);
      color: var(--tapsi-color-content-tertiary);
      margin-top: var(--tapsi-spacing-2);
    }

    .expiry-date-label {
      font-weight: var(--tapsi-typography-label-xs-weight);
      font-size: var(--tapsi-typography-label-xs-size);
      line-height: var(--tapsi-typography-label-xs-height);
      color: var(--tapsi-color-content-tertiary); /* Default color */
    }

    .expiry-date-label.expiring {
      color: var(--tapsi-color-content-negative); /* Warn color */
    }

    .action {
      margin-top: var(--tapsi-spacing-4);
    }
  }
`;
