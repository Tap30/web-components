import type { TemplateResult } from "lit";
import * as Icons from "./icons";

export const AUTHORS = ["in", "out"] as const;
export const STATES = ["sent", "seen", "pending", "failed"] as const;

export const BASENAME = "chat-bubble";
export const BASE_BASENAME = `${BASENAME}-base`;

export enum BaseSlots {
  BODY = "body",
  FOOTER = "footer",
}

export enum BaseParts {
  ROOT = "root",
  BODY = "body",
  FOOTER = "footer",
}

export enum OutParts {
  ROOT = "root",
  AVATAR = "avatar",
}

export enum InParts {
  ROOT = "root",
  STATUS = "status",
  FAILURE_INDICATOR = "failure-indicator",
}

export const Slots = {
  default: "",
};

export const Parts = {
  base: BaseParts,
  out: OutParts,
  in: InParts,
};

export const STATUS_TO_LOCALE_MAP: Record<
  Exclude<(typeof STATES)[number], "failed">,
  string
> = {
  pending: "در حال ارسال...",
  seen: "خوانده شد",
  sent: "فرستاده شد",
};

export const STATUS_TO_ICON_MAP: Record<
  (typeof STATES)[number],
  TemplateResult<1>
> = {
  failed: Icons.failed,
  pending: Icons.pending,
  seen: Icons.seen,
  sent: Icons.sent,
};
