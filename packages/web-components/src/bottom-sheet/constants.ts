export const SENTINEL_DEFAULT_SNAP_POINTS = [-Infinity, -Infinity];

export const Slots = {
  HEADER: "header",
  BODY: "body",
  ACTION_BAR: "action-bar",
} as const;

export const Status = {
  OPENED: "opened",
  CLOSED: "closed",
  OPENING: "opening",
  CLOSING: "closing",
} as const;
