import type { Status } from "./constants";

export type MetaData = {
  /**
   * The snap points currently in use.
   */
  snapPoints: number[];
  /**
   * The height of the header/
   */
  headerHeight: number;
  /**
   * The height of the action bar, if there's one.
   */
  actionBarHeight: number;
  /**
   * The height of the body, if there's one.
   */
  bodyHeight: number;
  /**
   * The total height of the bottom sheet (action-bar + header + body).
   */
  totalHeight: number;
  /**
   * The current height of the bottom sheet.
   */
  height: number;
};

export type SnapToCallbackArgument = (data: MetaData) => number;

export type StatusEnum = (typeof Status)[keyof typeof Status];
