import { runBeforeRepaint } from "../event-loop-execution.ts";
import isSsr from "../is-ssr.ts";

type LockOptions = {
  reserveScrollBarGap?: boolean;
  allowTouchMove?: (element: HTMLElement) => boolean;
};

type Lock = {
  targetElement: HTMLElement;
  options?: LockOptions;
};

type HandleScrollEvent = TouchEvent;

class ScrollLocker {
  private _hasPassiveEvents = false;
  private _isIosDevice = false;

  private _locks: Array<Lock> = [];

  private _documentListenerAdded: boolean = false;

  private _initialClientY: number = -1;

  private _cachedBodySettings: {
    overflow: string;
    positioning: {
      position: string;
      left: string;
      right: string;
      top: string;
    } | null;
    paddingRight: string;
  } = {
    overflow: "",
    positioning: null,
    paddingRight: "",
  };

  constructor() {
    this._preventDefault = this._preventDefault.bind(this);

    if (!isSsr()) {
      let hasPassiveEvents = false;

      const passiveTestOptions = {
        get passive() {
          hasPassiveEvents = true;
          return undefined;
        },
      };

      /* eslint-disable @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      window.addEventListener("test-passive", null, passiveTestOptions);
      // @ts-ignore
      window.removeEventListener("test-passive", null);
      /* eslint-enable @typescript-eslint/ban-ts-comment */

      this._isIosDevice =
        typeof window !== "undefined" &&
        !!window.navigator &&
        ((!!window.navigator.platform &&
          (/iP(ad|hone|od)/.test(window.navigator.platform) ||
            (window.navigator.platform === "MacIntel" &&
              window.navigator.maxTouchPoints > 1))) ||
          (!!window.navigator.userAgent &&
            /iP(ad|hone|od)/.test(window.navigator.userAgent)));

      this._hasPassiveEvents = hasPassiveEvents;
    }
  }

  /**
   * Returns true if `element` should be allowed to receive touchmove events.
   */
  public _allowTouchMove(element: HTMLElement) {
    return this._locks.some(
      lock => lock.options?.allowTouchMove?.(element) ?? false,
    );
  }

  private _preventDefault(rawEvent: HandleScrollEvent): boolean {
    const event = rawEvent;

    // For the case whereby consumers adds a touchmove event listener to document.
    // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
    // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
    // the touchmove event on document will break.
    if (this._allowTouchMove(event.target as HTMLElement)) return true;

    // Do not prevent if the event has more than one touch
    // (usually meaning this is a multi touch gesture like pinch to zoom).
    if (event.touches.length > 1) return true;

    if (event.preventDefault) event.preventDefault();

    return false;
  }

  private _setOverflowHidden(options?: LockOptions) {
    const { reserveScrollBarGap = true } = options ?? {};

    if (!this._cachedBodySettings.paddingRight) {
      const scrollBarGap =
        window.innerWidth - document.documentElement.clientWidth;

      if (reserveScrollBarGap && scrollBarGap > 0) {
        const computedBodyPaddingRight = parseInt(
          window
            .getComputedStyle(document.body)
            .getPropertyValue("padding-right"),
          10,
        );

        this._cachedBodySettings.paddingRight =
          document.body.style.paddingRight;

        document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarGap}px`;
      }
    }

    if (!this._cachedBodySettings.overflow) {
      this._cachedBodySettings.overflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
  }

  private _restoreOverflowSetting() {
    document.body.style.paddingRight = this._cachedBodySettings.paddingRight;
    this._cachedBodySettings.paddingRight = "";

    document.body.style.overflow = this._cachedBodySettings.overflow;
    this._cachedBodySettings.overflow = "";
  }

  private _setPositionFixed() {
    window.requestAnimationFrame(() => {
      if (!this._cachedBodySettings.positioning) {
        this._cachedBodySettings.positioning = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          right: document.body.style.right,
        };

        // Update the dom inside an animation frame
        const { scrollY, scrollX, innerHeight } = window;

        document.body.style.position = "fixed";
        document.body.style.top = `${-scrollY}px`;
        document.body.style.left = `${-scrollX}px`;
        document.body.style.right = `0`;

        runBeforeRepaint(() => {
          // Attempt to check if the bottom bar appeared due to the position change
          const bottomBarHeight = innerHeight - window.innerHeight;

          if (bottomBarHeight && scrollY >= innerHeight) {
            // Move the content further up so that the bottom bar doesn't hide it
            document.body.style.top = `${-(scrollY + bottomBarHeight)}px`;
          }
        });
      }
    });
  }

  private _restorePositionSetting() {
    // Convert the position from "px" to Int
    const y = -parseInt(document.body.style.top, 10);
    const x = -parseInt(document.body.style.left, 10);

    const {
      left = "",
      position = "",
      top = "",
      right = "",
    } = this._cachedBodySettings.positioning ?? {};

    // Restore styles
    document.body.style.position = position;
    document.body.style.top = top;
    document.body.style.left = left;
    document.body.style.right = right;

    // Restore scroll
    window.scrollTo(x, y);

    this._cachedBodySettings.positioning = null;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
  private _isTargetElementTotallyScrolled(targetElement: HTMLElement) {
    if (!targetElement) return false;

    return (
      targetElement.scrollHeight - targetElement.scrollTop <=
      targetElement.clientHeight
    );
  }

  private _handleScroll(event: HandleScrollEvent, targetElement: HTMLElement) {
    const touchY = event.targetTouches[0]?.clientY ?? 0;
    const clientY = touchY - this._initialClientY;

    if (this._allowTouchMove(event.target as HTMLElement)) return false;

    if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
      // Element is at the top of its scroll.
      return this._preventDefault(event);
    }

    if (this._isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
      // Element is at the bottom of its scroll.
      return this._preventDefault(event);
    }

    event.stopPropagation();

    return true;
  }

  public lock(targetElement: HTMLElement, options?: LockOptions) {
    const alreadyLocked = this._locks.some(
      lock => lock.targetElement === targetElement,
    );

    if (alreadyLocked) return;

    const lock: Lock = {
      targetElement,
      options,
    };

    this._locks.push(lock);

    if (this._isIosDevice) this._setPositionFixed();
    else this._setOverflowHidden(options);

    if (this._isIosDevice) {
      targetElement.ontouchstart = (event: HandleScrollEvent) => {
        if (event.targetTouches.length === 1) {
          // Detect single touch.
          this._initialClientY = event.targetTouches[0]!.clientY;
        }
      };

      targetElement.ontouchmove = (event: HandleScrollEvent) => {
        if (event.targetTouches.length === 1) {
          // Detect single touch.
          this._handleScroll(event, targetElement);
        }
      };

      if (!this._documentListenerAdded) {
        document.addEventListener(
          "touchmove",
          this._preventDefault,
          this._hasPassiveEvents ? { passive: false } : undefined,
        );

        this._documentListenerAdded = true;
      }
    }
  }

  public clearLocks() {
    if (this._isIosDevice) {
      // Clear all locks ontouchstart/ontouchmove handlers, and the references.
      this._locks.forEach((lock: Lock) => {
        lock.targetElement.ontouchstart = null;
        lock.targetElement.ontouchmove = null;
      });

      if (this._documentListenerAdded) {
        document.removeEventListener("touchmove", this._preventDefault);

        this._documentListenerAdded = false;
      }

      // Reset initial clientY.
      this._initialClientY = -1;
    }

    if (this._isIosDevice) this._restorePositionSetting();
    else this._restoreOverflowSetting();

    this._locks = [];
  }

  public unlock(targetElement: HTMLElement) {
    this._locks = this._locks.filter(
      lock => lock.targetElement !== targetElement,
    );

    if (this._isIosDevice) {
      targetElement.ontouchstart = null;
      targetElement.ontouchmove = null;

      if (this._documentListenerAdded && this._locks.length === 0) {
        document.removeEventListener("touchmove", this._preventDefault);

        this._documentListenerAdded = false;
      }
    }

    if (this._isIosDevice) this._restorePositionSetting();
    else this._restoreOverflowSetting();
  }
}

export default ScrollLocker;
