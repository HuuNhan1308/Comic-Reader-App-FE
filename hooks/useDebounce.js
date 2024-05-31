import { useEffect, useState } from "react";

// RESPONSIBILITY BY: HO HUU NHAN

/**
 * `useDebounce` is a custom React hook that debounces a value.
 *
 * @param {any} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds to wait before updating the debounced value.
 *
 * This hook maintains a state variable `debouncedValue` for storing the debounced value.
 *
 * It uses the `useEffect` hook to set a timeout that updates `debouncedValue` to the current value after the specified delay.
 * If the value changes before the delay is over, the timeout is cleared and a new one is set.
 *
 * The hook returns the debounced value.
 *
 * @returns {any} The debounced value.
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
