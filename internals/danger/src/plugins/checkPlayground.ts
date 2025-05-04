import { type PluginRuntime } from "../DangerClient";

export const checkPlayground: PluginRuntime = client => {
  const playgroundEditedFiles = [
    ...client.git.modified_files,
    ...client.git.created_files,
    ...client.git.deleted_files,
  ].filter(file => file.startsWith("playground"));

  if (playgroundEditedFiles.length > 0) {
    client.warnWithFootnote(
      "🛝 Changes in `playground` was detected!",
      "Some of the changes in this PR are related to project's playground. Check them before merging the PR.",
    );
  }
};
