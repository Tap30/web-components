import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: inline-block;
  }

  .root.left .badge {
    transform: translate(-50%, -50%);
  }

  .root.right .badge {
    transform: translate(50%, -50%);
  }

  .root.rectangle.top .badge {
    top: 0;
  }

  .root.rectangle.middle .badge {
    top: 50%;
  }

  .root.rectangle.left .badge {
    left: 0;
  }

  .root.rectangle.right .badge {
    right: 0;
  }

  .root.circle.top .badge {
    top: 14.5%;
  }

  .root.circle.middle .badge {
    top: 50%;
  }

  .root.circle:not(.middle).left .badge {
    left: 14.5%;
  }

  .root.circle:not(.middle).right .badge {
    right: 14.5%;
  }

  .root.pill.top .badge {
    top: var(--pill-badge-wrapper-badge-offset); // TODO: fix
  }

  .root.pill.middle .badge {
    top: 50%;
  }

  .root.pill:not(.middle).left .badge {
    left: var(--pill-badge-wrapper-badge-offset); // TODO: fix
  }

  .root.pill:not(.middle).right .badge {
    right: var(--pill-badge-wrapper-badge-offset); // TODO: fix
  }

  .root.pill.middle.left .badge {
    left: 0;
  }

  .root.pill.middle.right .badge {
    right: 0;
  }

  .root {
    position: relative;

    display: inline-flex;
    flex-shrink: 0;

    vertical-align: middle;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    position: absolute;

    z-index: 1;
    isolation: isolate;
  }
`;

export default styles;
