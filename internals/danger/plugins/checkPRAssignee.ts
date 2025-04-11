import { type PluginRuntime } from "../DangerClient.ts";

export const checkPRAssignee: PluginRuntime = client => {
  if (client.github.pr.assignee === null) {
    client.failWithFootnote(
      "👤 No assignee was set for PR!",
      "Please assign someone to merge this PR, and optionally include people who should review.",
    );
  }
};
