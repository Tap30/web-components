class AnimationController {
  private _promiseResolver:
    | ((value: boolean | PromiseLike<boolean>) => void)
    | null = null;

  private _animationAbortController: AbortController | null = null;
  private _promise: Promise<boolean> | null = null;
  private _signal: AbortSignal | null = null;

  constructor() {
    this._handleAbort = this._handleAbort.bind(this);
  }

  private _handleAbort() {
    this._promiseResolver?.(false);
  }

  private _cleanup() {
    this._promise = null;
    this._signal = null;
    this._animationAbortController = null;
    this._promiseResolver = null;
  }

  public start() {
    this._animationAbortController?.abort();
    this._animationAbortController = new AbortController();
    this._signal = this._animationAbortController.signal;

    this._promise = new Promise<boolean>(resolve => {
      this._promiseResolver = resolve;
    });

    this._signal.addEventListener("abort", this._handleAbort);
  }

  public finish() {
    this._promiseResolver?.(true);
    this._cleanup();
  }

  public abort() {
    this._animationAbortController?.abort();
    this._cleanup();
  }

  public get promise() {
    return this._promise;
  }

  public get signal() {
    return this._signal;
  }
}

export default AnimationController;
