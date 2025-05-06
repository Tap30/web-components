import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  FileInputClearEvent,
  FileInput as FileInputElement,
  FileInputRetryEvent,
  FileInputSlots,
  registerFileInput,
} from "@tapsioss/web-components";

registerFileInput();

export const FileInput: ReactWebComponent<
  FileInputElement,
  {
    onRetry: EventName<FileInputRetryEvent>;
    onClear: EventName<FileInputClearEvent>;
    onChange: string;
    onInput: string;
  }
> = createComponent({
  tagName: "tapsi-file-input",
  elementClass: FileInputElement,
  react: React,
  events: {
    onRetry: "retry" as EventName<FileInputRetryEvent>,
    onClear: "clear" as EventName<FileInputClearEvent>,
    onChange: "input",
    onInput: "input",
  },
});

export {
  FileInputClearEvent,
  FileInputElement,
  FileInputRetryEvent,
  FileInputSlots,
};
