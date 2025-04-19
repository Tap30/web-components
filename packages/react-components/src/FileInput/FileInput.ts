import * as LitReact from "@lit/react";
import * as React from "react";

import {
  FileInput as FileInputElementClass,
  FileInputRetryEvent,
  FileInputSlots,
  registerFileInputElement,
} from "@tapsioss/web-components";

registerFileInputElement();

const __FileInput = LitReact.createComponent({
  tagName: "tapsi-file-input",
  elementClass: FileInputElementClass,
  react: React,
  events: { onRetry: "retry" as LitReact.EventName<FileInputRetryEvent> },
});

export { FileInputRetryEvent, FileInputSlots };

const FileInput = __FileInput;

export { FileInput };
