import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerSkeleton,
  Skeleton as SkeletonElementClass,
  SkeletonSlots,
} from "@tapsioss/web-components";

registerSkeleton();

const __Skeleton = LitReact.createComponent({
  tagName: "tapsi-skeleton",
  elementClass: SkeletonElementClass,
  react: React,
  events: {},
});

export { SkeletonSlots };

const Skeleton = __Skeleton;

export { Skeleton };
