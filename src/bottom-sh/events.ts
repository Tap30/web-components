import { BaseEvent } from "../utils";

export class OpeningEvent extends BaseEvent<object> {
  public static type = "opening";

  constructor() {
    super(OpeningEvent.type, {
      composed: true,
      cancelable: true,
      details: {},
    });
  }
}

export class ClosingEvent extends BaseEvent<object> {
  public static type = "closing";

  constructor() {
    super(ClosingEvent.type, {
      composed: true,
      cancelable: true,
      details: {},
    });
  }
}

export class CloseEvent extends BaseEvent<object> {
  public static type = "close";

  constructor() {
    super(CloseEvent.type, {
      composed: true,
      details: {},
    });
  }
}

export class OpenedEvent extends BaseEvent<object> {
  public static type = "opened";

  constructor() {
    super(OpenedEvent.type, {
      composed: true,
      details: {},
    });
  }
}

export class ClosedEvent extends BaseEvent<object> {
  public static type = "closed";

  constructor() {
    super(ClosedEvent.type, {
      composed: true,
      details: {},
    });
  }
}

export class GrabStartEvent extends BaseEvent<object> {
  public static type = "grabstart";

  constructor() {
    super(GrabStartEvent.type, {
      composed: true,
      details: {},
    });
  }
}

export class GrabEndEvent extends BaseEvent<object> {
  public static type = "grabend";

  constructor() {
    super(GrabEndEvent.type, {
      composed: true,
      details: {},
    });
  }
}

export class GrabbingEvent extends BaseEvent<object> {
  public static type = "grabbing";

  constructor() {
    super(GrabbingEvent.type, {
      composed: true,
      details: {},
    });
  }
}
