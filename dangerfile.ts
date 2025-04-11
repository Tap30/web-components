import { danger } from "danger";

import DangerClient from "./internals/danger/DangerClient.ts";
import { checkLockFile } from "./internals/danger/plugins/checkLockFile.ts";
import { checkPlayground } from "./internals/danger/plugins/checkPlayground.ts";
import { checkPRAssignee } from "./internals/danger/plugins/checkPRAssignee.ts";
import { checkPRSize } from "./internals/danger/plugins/checkPRSize.ts";

await (async function tasks() {
  const dangerClient = new DangerClient(danger);

  dangerClient.use(checkLockFile);
  dangerClient.use(checkPlayground);
  dangerClient.use(checkPRSize);
  dangerClient.use(checkPRAssignee);

  await dangerClient.analyze();
})();
