import { BaseEvent } from "../utils";

type SnappedEventDetails = {
  snapPoint: number;
};

export class SnappedEvent extends BaseEvent<SnappedEventDetails> {
  public static type = "snapped";

  constructor(details: SnappedEventDetails) {
    super(SnappedEvent.type, {
      composed: true,
      details,
    });
  }
}

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
