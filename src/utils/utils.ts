export function debounce<T>(func: (...args: T[]) => void, delay: number) {
  let timeout: number | null = null;
  return (...args: T[]) => {
    if (timeout)
      clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, delay)
  }
}
