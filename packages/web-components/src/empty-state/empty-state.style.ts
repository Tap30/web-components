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

  .icon {
    margin: var(
        --tap-empty-state-content-vertical-margin,
        var(--tap-sys-spacing-6)
      )
      var(--tap-empty-state-content-horizontal-margin, 0);
  }

  .content {
    text-align: center;
    padding: var(
        --tap-empty-state-content-vertical-padding,
        var(--tap-sys-spacing-4)
      )
      var(
        --tap-empty-state-content-horizontal-padding,
        var(--tap-sys-spacing-6)
      );
  }

  .title {
    font-size: var(
      --tap-empty-state-title-font-size,
      var(--tap-sys-typography-headline-sm-size)
    );
    font-weight: var(
      tap-empty-state-title-font-weight,
      var(--tap-sys-typography-headline-sm-weight)
    );
    line-height: var(
      --tap-empty-state-title-line-height,
      var(--tap-sys-typography-headline-sm-height)
    );
  }

  .description {
    margin: var(
        --tap-empty-state-description-top-margin,
        var(--tap-sys-spacing-4)
      )
      0 0 0;
    font-size: var(
      --tap-empty-state-description-font-size,
      var(--tap-sys-typography-body-md-size)
    );
    font-weight: var(
      --tap-empty-state-description-font-weight,
      var(--tap-sys-typography-body-md-weight)
    );
    line-height: var(
      --tap-empty-state-description-line-height,
      var(--tap-sys-typography-body-md-height)
    );
    color: var(
      --tap-empty-state-description-color,
      var(--tap-palette-gray-600)
    );
  }

  .actions {
    margin: var(
        --tap-empty-state-content-vertical-margin,
        var(--tap-sys-spacing-6)
      )
      var(--tap-empty-state-content-horizontal-margin, 0);
  }
`;
