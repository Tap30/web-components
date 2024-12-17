import type { ContainerStatus } from "./constants";

export type SnapPoint = number;

export type SnapToCallbackArgument = (snapProps: {
  /**
   * The snap points currently in use.
   */
  snapPoints: SnapPoint[];
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
  /**
   * Minimum height needed to avoid scroll overflow in the
   * content area, if possible.
   */
  minHeight: number;
  /**
   * Maximum height the sheet can be, your snap points are capped
   * to this value.
   * It can be overriden using the `max-height` attribute.
   */
  maxHeight: number;
}) => SnapPoint;

export type ContainerStatusEnum =
  (typeof ContainerStatus)[keyof typeof ContainerStatus];
