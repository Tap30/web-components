import { BaseEvent, type ResizeSensorSizeChangeProps } from "../utils";

export class OpeningEvent extends BaseEvent<null> {
  public static type = "opening";

  constructor() {
    super(OpeningEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}

export class ClosingEvent extends BaseEvent<null> {
  public static type = "closing";

  constructor() {
    super(ClosingEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}

export class CloseEvent extends BaseEvent<null> {
  public static type = "close";

  constructor() {
    super(CloseEvent.type, {
      composed: true,
      details: null,
    });
  }
}

export class OpenedEvent extends BaseEvent<null> {
  public static type = "opened";

  constructor() {
    super(OpenedEvent.type, {
      composed: true,
      details: null,
    });
  }
}

export class ClosedEvent extends BaseEvent<null> {
  public static type = "closed";

  constructor() {
    super(ClosedEvent.type, {
      composed: true,
      details: null,
    });
  }
}

type GrabEventDetails = {
  originEvent: MouseEvent | TouchEvent;
};

export class GrabStartEvent extends BaseEvent<GrabEventDetails> {
  public static type = "grabstart";

  constructor(details: GrabEventDetails) {
    super(GrabStartEvent.type, {
      composed: true,
      details,
    });
  }
}

export class GrabEndEvent extends BaseEvent<GrabEventDetails> {
  public static type = "grabend";

  constructor(details: GrabEventDetails) {
    super(GrabEndEvent.type, {
      composed: true,
      details,
    });
  }
}

export class GrabbingEvent extends BaseEvent<GrabEventDetails> {
  public static type = "grabbing";

  constructor(details: GrabEventDetails) {
    super(GrabbingEvent.type, {
      composed: true,
      details,
    });
  }
}

export class ExpandEvent extends BaseEvent<null> {
  public static type = "expand";

  constructor() {
    super(ExpandEvent.type, {
      composed: true,
      details: null,
    });
  }
}

type ResizeEventDetails = Omit<ResizeSensorSizeChangeProps, "element">;

export class ResizeEvent extends BaseEvent<ResizeEventDetails> {
  public static type = "resize";

  constructor(details: ResizeEventDetails) {
    super(ResizeEvent.type, {
      composed: true,
      details,
    });
  }
}
