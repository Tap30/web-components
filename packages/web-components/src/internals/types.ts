/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseEvent } from "../utils";

export type RegisteredCustomElement = {
  Slots?: Readonly<Record<string, string>>;
  eventsMap?: Readonly<Record<string, BaseEvent<any>>>;
  tagName: string;
  elementClass: CustomElementConstructor;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
