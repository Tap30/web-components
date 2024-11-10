import { css } from "lit";

export default css`
  .root.left .badge {
    transform: translate(-50%, -50%);
  }

  .root.right .badge {
    transform: translate(50%, -50%);
  }

  .root.rectangular.top .badge {
    top: 0;
  }

  .root.rectangular.middle .badge {
    top: 50%;
  }

  .root.rectangular.left .badge {
    left: 0;
  }

  .root.rectangular.right .badge {
    right: 0;
  }

  .root.circular.top .badge {
    top: 15px;
  }

  .root.circular.middle .badge {
    top: 50%;
  }

  .root.circular:not(.middle).left .badge {
    left: 15px;
  }

  .root.circular:not(.middle).right .badge {
    right: 15px;
  }

  .root.circular.middle.left .badge {
    left: 0;
  }

  .root.circular.middle.right .badge {
    right: 0;
  }

  .root {
    position: relative;

    display: inline-flex;
    flex-shrink: 0;

    vertical-align: middle;

    z-index: 2;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    position: absolute;
  }
`;
