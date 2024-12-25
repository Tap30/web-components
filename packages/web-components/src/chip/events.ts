import { BaseEvent } from "../utils";

export class SelectEvent extends BaseEvent<null> {
  public static type = "select";

  constructor() {
    super(SelectEvent.type, {
      details: null,
      bubbles: true,
      composed: true,
    });
  }
}

export class DeselectEvent extends BaseEvent<null> {
  public static type = "deselect";

  constructor() {
    super(DeselectEvent.type, {
      details: null,
      bubbles: true,
      composed: true,
    });
  }
}
