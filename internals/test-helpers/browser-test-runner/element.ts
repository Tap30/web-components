// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ElementHandle } from "@playwright/test";
import type { RunnerPageInternal } from "./types";

const ActionTypes = {
  METHOD_INVOCATION: "METHOD_INVOCATION",
  SET_PROPERTY: "SET_PROPERTY",
  SET_ATTRIBUTE: "SET_ATTRIBUTE",
  REMOVE_ATTRIBUTE: "REMOVE_ATTRIBUTE",
  TOGGLE_ATTRIBUTE: "TOGGLE_ATTRIBUTE",
  DISPATCH_EVENT: "DISPATCH_EVENT",
} as const;

type Actions =
  | {
      type: typeof ActionTypes.METHOD_INVOCATION;
      payload: {
        methodName: string;
        methodArgs: any[];
      };
    }
  | {
      type: typeof ActionTypes.SET_PROPERTY;
      payload: {
        propertyName: string;
        propertyValue: unknown;
      };
    }
  | {
      type: typeof ActionTypes.SET_ATTRIBUTE;
      payload: {
        attributeName: string;
        attributeValue: unknown;
      };
    }
  | {
      type: typeof ActionTypes.REMOVE_ATTRIBUTE;
      payload: {
        attributeName: string;
      };
    }
  | {
      type: typeof ActionTypes.TOGGLE_ATTRIBUTE;
      payload: {
        attributeName: string;
      };
    }
  | {
      type: typeof ActionTypes.DISPATCH_EVENT;
      payload: {
        eventName: string;
        eventConfig: EventInit;
      };
    };

const getPlaywrightExecutionContext = (elementHandle: ElementHandle) => {
  return elementHandle.ownerFrame();
};

class RunnerElement {
  private _pageInternal: RunnerPageInternal;
  private _elementHandle: ElementHandle<HTMLElement>;

  private _actionsQueue: Actions[] = [];

  constructor(
    pageInternal: RunnerPageInternal,
    elementHandle: ElementHandle<HTMLElement>,
  ) {
    this._pageInternal = pageInternal;
    this._elementHandle = elementHandle;

    pageInternal._elements.push(this);
  }

  public find(selector: string) {
    return find(this._pageInternal, this._elementHandle, selector);
  }

  public findAll(selector: string) {
    return findAll(this._pageInternal, this._elementHandle, selector);
  }

  public invokeMethod(methodName: string, ...methodArgs: any[]) {
    this._actionsQueue.push({
      type: ActionTypes.METHOD_INVOCATION,
      payload: { methodName, methodArgs },
    });

    return this.runActions();
  }

  public async runActions() {
    if (this._actionsQueue.length === 0) return;

    const execCtx = await getPlaywrightExecutionContext(this._elementHandle);

    if (!execCtx) return;

    return execCtx.evaluate(
      ([el, actions]) => {
        // BROWSER CONTEXT
        for (const action of actions) {
          switch (action.type) {
            case ActionTypes.METHOD_INVOCATION: {
              const { methodArgs, methodName } = action.payload;

              if (methodName in el) {
                const method = el[methodName as unknown as keyof typeof el];

                if (typeof method === "function") {
                  return method.apply(el, methodArgs) as unknown;
                }
              }

              return null;
            }

            case ActionTypes.SET_PROPERTY: {
              return null;
            }

            case ActionTypes.SET_ATTRIBUTE: {
              return null;
            }

            case ActionTypes.REMOVE_ATTRIBUTE: {
              return null;
            }

            case ActionTypes.TOGGLE_ATTRIBUTE: {
              return null;
            }

            case ActionTypes.DISPATCH_EVENT: {
              return null;
            }

            default:
              return null;
          }
        }

        return null;
      },
      [this._elementHandle, this._actionsQueue] as const,
    );
  }
}
