import { BaseEvent } from "../utils";

export class HideEvent extends BaseEvent<null> {
  public static type = "hide";

  constructor() {
    super(HideEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}

export class ShowEvent extends BaseEvent<null> {
  public static type = "show";

  constructor() {
    super(ShowEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}
