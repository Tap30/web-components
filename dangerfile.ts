import {
  checkLockFile,
  checkPlayground,
  DangerClient,
} from "@internals/danger";
import { danger } from "danger";

void (async () => {
  const dangerClient = new DangerClient(danger);

  dangerClient.use(checkLockFile);
  dangerClient.use(checkPlayground);
  await dangerClient.analyze();
})();
