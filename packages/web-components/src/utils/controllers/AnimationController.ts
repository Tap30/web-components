class AnimationController {
  // Resolver for the promise indicating animation completion
  private _promiseResolver:
    | ((value: boolean | PromiseLike<boolean>) => void)
    | null = null;

  // Controller to abort the animation if needed
  private _animationAbortController: AbortController | null = null;

  private _promise: Promise<boolean> | null = null;
  private _signal: AbortSignal | null = null;

  constructor() {
    this._handleAbort = this._handleAbort.bind(this);
    this._cleanup = this._cleanup.bind(this);
    this.start = this.start.bind(this);
    this.finish = this.finish.bind(this);
    this.abort = this.abort.bind(this);
  }

  // Handle the abort event by rejecting the promise
  private _handleAbort() {
    this._promiseResolver?.(false);
  }

  // Clean up resources and reset state
  private _cleanup() {
    this._promise = null;
    this._signal = null;
    this._animationAbortController = null;
    this._promiseResolver = null;
  }

  /**
   * Starts the animation and creates new promise and abort signal.
   */
  public start() {
    // Abort any ongoing animation
    this._animationAbortController?.abort();

    // Initialize a new AbortController and signal
    this._animationAbortController = new AbortController();
    this._signal = this._animationAbortController.signal;

    // Create a new promise and store the resolver
    this._promise = new Promise<boolean>(resolve => {
      this._promiseResolver = resolve;
    });

    // Listen for the abort event
    this._signal.addEventListener("abort", this._handleAbort);
  }

  // Finish the animation and resolve the promise
  public finish() {
    this._promiseResolver?.(true);
    this._cleanup();
  }

  // Abort the animation and clean up
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
