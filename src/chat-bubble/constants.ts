import type { TemplateResult } from "lit";
import * as Icons from "./icons";

export const AUTHORS = ["driver", "passenger"] as const;
export const STATES = ["sent", "seen", "pending", "failed"] as const;

export const BASENAME = "chat-bubble";

export const BASE_BASENAME = `${BASENAME}-base`;

export enum BaseSlots {
  BODY = "body",
  FOOTER = "footer",
}

export enum BaseParts {
  ROOT = `${BASE_BASENAME}-root`,
  BODY = `${BASE_BASENAME}-body`,
  FOOTER = `${BASE_BASENAME}-footer`,
  TIMESTAMP = `${BASE_BASENAME}-timestamp`,
}

export enum DriverParts {
  ROOT = `${BASENAME}-driver-root`,
  AVATAR = `${BASENAME}-driver-avatar`,
}

export enum PassengerParts {
  ROOT = `${BASENAME}-passenger-root`,
  STATUS = `${BASENAME}-passenger-status`,
  FAILURE_INDICATOR = `${BASENAME}-passenger-failure-indicator`,
}

export const Slots = {
  base: BaseSlots,
};

export const Parts = {
  base: BaseParts,
  driver: DriverParts,
  passenger: PassengerParts,
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
