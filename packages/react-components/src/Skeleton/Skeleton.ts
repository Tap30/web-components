import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  registerSkeleton,
  Skeleton as SkeletonElement,
  SkeletonSlots,
} from "@tapsioss/web-components";

registerSkeleton();

export const Skeleton: ReactWebComponent<SkeletonElement> = createComponent({
  tagName: "tapsi-skeleton",
  elementClass: SkeletonElement,
  react: React,
  events: {},
});

export { SkeletonElement, SkeletonSlots };
