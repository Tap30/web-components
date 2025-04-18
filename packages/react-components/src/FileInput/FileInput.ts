import * as LitReact from "@lit/react";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
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

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const FileInput = __FileInput;

export { FileInput };
