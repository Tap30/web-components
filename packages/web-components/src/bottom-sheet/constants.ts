import type { DragConfig } from "@use-gesture/vanilla";

export const SENTINEL_DEFAULT_SNAP_POINTS = [-Infinity, -Infinity] as const;

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

export const _DRAG_GESTURE_DEFAULT_CONFIG: DragConfig = {
  filterTaps: true,
};
