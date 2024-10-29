export type MixinBase<ExpectedBase = object> = abstract new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => ExpectedBase;

export type MixinReturn<MixinBase, MixinClass = object> = (abstract new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => MixinClass) &
  MixinBase;
