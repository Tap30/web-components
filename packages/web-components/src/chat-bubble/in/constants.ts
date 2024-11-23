import type { TemplateResult } from "lit";
import * as Icons from "./icons";

export const STATES = ["sent", "seen", "pending", "failed"] as const;

export type States = (typeof STATES)[number];

export const STATUS_TO_LOCALE_MAP: Record<Exclude<States, "failed">, string> = {
  pending: "در حال ارسال...",
  seen: "خوانده شد",
  sent: "فرستاده شد",
};

export const STATUS_TO_ICON_MAP: Record<States, TemplateResult> = {
  failed: Icons.failed,
  pending: Icons.pending,
  seen: Icons.seen,
  sent: Icons.sent,
};
