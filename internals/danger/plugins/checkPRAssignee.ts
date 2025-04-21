// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/extensions */
import { type PluginRuntime } from "../DangerClient";

export const checkPRAssignee: PluginRuntime = client => {
  if (client.github.pr.assignee === null) {
    client.failWithFootnote(
      "👤 No assignee was set for PR!",
      "Please assign someone to merge this PR, and optionally include people who should review.",
    );
  }
};
