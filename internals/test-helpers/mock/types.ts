export type CallDetail = {};

export type MockFn = {
  called: boolean;
  callCount: number;
  calls: CallDetail[];
  __id__: number;
};
