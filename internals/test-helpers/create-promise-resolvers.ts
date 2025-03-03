const createPromiseResolvers = <T = void>() => {
  const noop = () => void 0;

  let _resolve: (value: T | PromiseLike<T>) => void = noop;
  let _reject: (reason?: unknown) => void = noop;

  const createPromise = () =>
    new Promise<T>((res, rej) => {
      _resolve = res;
      _reject = rej;
    });

  let _promise = createPromise();

  const renew = () => {
    _promise = createPromise();
  };

  return {
    get promise() {
      return _promise;
    },
    get resolve() {
      return _resolve;
    },
    get reject() {
      return _reject;
    },
    renew,
  };
};

export default createPromiseResolvers;
