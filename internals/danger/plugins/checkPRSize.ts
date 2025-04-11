import { type PluginRuntime } from "../DangerClient.ts";

type CheckPlaygroundOptions = {
  bigPRThreshold: number;
};

export const checkPRSize: PluginRuntime<CheckPlaygroundOptions> = (
  client,
  options,
) => {
  if (!options?.bigPRThreshold) {
    throw new Error("the bigPRThreshold options is required!");
  }

  if (
    client.github.pr.additions + client.github.pr.deletions >
    options.bigPRThreshold
  ) {
    client.warnWithFootnote(
      "🤯 The PR is too big!",
      [
        "Pull Request size seems relatively large.",
        "If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.",
      ].join("/n"),
    );
  }
};
