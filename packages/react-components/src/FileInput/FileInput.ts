import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  FileInput as FileInputElement,
  FileInputRetryEvent,
  FileInputSlots,
  registerFileInput,
} from "@tapsioss/web-components";

registerFileInput();

export const FileInput: ReactWebComponent<
  FileInputElement,
  { onRetry: EventName<FileInputRetryEvent>; onChange: string; onInput: string }
> = createComponent({
  tagName: "tapsi-file-input",
  elementClass: FileInputElement,
  react: React,
  events: {
    onRetry: "retry" as EventName<FileInputRetryEvent>,
    onChange: "input",
    onInput: "input",
  },
});

export { FileInputElement, FileInputRetryEvent, FileInputSlots };
