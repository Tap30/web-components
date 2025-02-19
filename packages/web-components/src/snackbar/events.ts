import { BaseEvent } from "../utils/index.ts";

export class HideEvent extends BaseEvent<null> {
  public static readonly type = "hide";

  constructor() {
    super(HideEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}

export class ShowEvent extends BaseEvent<null> {
  public static readonly type = "show";

  constructor() {
    super(ShowEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}
