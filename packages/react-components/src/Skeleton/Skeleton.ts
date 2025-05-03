import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerSkeleton,
  Skeleton as SkeletonInput,
  SkeletonSlots,
} from "@tapsioss/web-components";

registerSkeleton();

export const Skeleton = LitReact.createComponent({
  tagName: "tapsi-skeleton",
  elementClass: SkeletonInput,
  react: React,
  events: {},
});

export { SkeletonInput, SkeletonSlots };
