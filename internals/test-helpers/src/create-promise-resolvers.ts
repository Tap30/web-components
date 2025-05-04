const createPromiseResolvers = <T = void>(): {
  readonly promise: Promise<T>;
  readonly resolve: (value: T | PromiseLike<T>) => void;
  readonly reject: (reason?: unknown) => void;
  renew: () => void;
} => {
  const noop = () => void 0;

  let _resolve: (value: T | PromiseLike<T>) => void = noop;
  let _reject: (reason?: unknown) => void = noop;

  const createPromise = () =>
    new Promise<T>((res, rej) => {
      _resolve = res;
      _reject = rej;
    });

  let _promise = createPromise();

  const renew = (): void => {
    _promise = createPromise();
  };

  return {
    get promise(): Promise<T> {
      return _promise;
    },
    get resolve(): (value: T | PromiseLike<T>) => void {
      return _resolve;
    },
    get reject(): (reason?: unknown) => void {
      return _reject;
    },
    renew,
  };
};

export default createPromiseResolvers;
