import {
  checkLockFile,
  checkPlayground,
  checkPRAssignee,
  checkPRSize,
  DangerClient,
} from "@internals/danger";
import { danger } from "danger";

void (async () => {
  const dangerClient = new DangerClient(danger);

  dangerClient.use(checkLockFile);
  dangerClient.use(checkPlayground);
  dangerClient.use(checkPRSize);
  dangerClient.use(checkPRAssignee);

  await dangerClient.analyze();
})();
