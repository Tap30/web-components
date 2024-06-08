export function debounce<T>(func: (...args: T[]) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: T[]) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, delay);
  };
}
