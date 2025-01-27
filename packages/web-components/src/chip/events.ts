import { BaseEvent } from "../utils/index.ts";

export class SelectEvent extends BaseEvent<null> {
  public static readonly type = "select";

  constructor() {
    super(SelectEvent.type, {
      details: null,
      bubbles: true,
      composed: true,
    });
  }
}

export class DeselectEvent extends BaseEvent<null> {
  public static readonly type = "deselect";

  constructor() {
    super(DeselectEvent.type, {
      details: null,
      bubbles: true,
      composed: true,
    });
  }
}
