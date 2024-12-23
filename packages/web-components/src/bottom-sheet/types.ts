import type { Status } from "./constants";

export type SnapToCallbackArgument = (snapProps: {
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
   * The height of the bottom sheet.
   */
  height: number;
}) => number;

export type StatusEnum = (typeof Status)[keyof typeof Status];
