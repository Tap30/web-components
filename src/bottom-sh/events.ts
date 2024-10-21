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

export class OpenEvent extends BaseEvent<object> {
  public static type = "open";

  constructor() {
    super(OpenEvent.type, {
      composed: true,
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

export class GrabMoveEvent extends BaseEvent<object> {
  public static type = "grabmove";

  constructor() {
    super(GrabMoveEvent.type, {
      composed: true,
      details: {},
    });
  }
}

export class SizeChangeEvent extends BaseEvent<object> {
  public static type = "sizechange";

  constructor() {
    super(SizeChangeEvent.type, {
      composed: true,
      details: {},
    });
  }
}
