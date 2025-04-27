import * as LitReact from "@lit/react";
import * as React from "react";

import {
  FileInput as FileInputElementClass,
  FileInputRetryEvent,
  FileInputSlots,
  registerFileInput,
} from "@tapsioss/web-components";

registerFileInput();

export const FileInput = LitReact.createComponent({
  tagName: "tapsi-file-input",
  elementClass: FileInputElementClass,
  react: React,
  events: {
    onRetry: "retry" as LitReact.EventName<FileInputRetryEvent>,
    onChange: "input",
    onInput: "input",
  },
});

export { FileInputRetryEvent, FileInputSlots };
