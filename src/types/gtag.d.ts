// Type definitions for Google Analytics gtag.js
interface Window {
  dataLayer: Array<Record<string, unknown>>;
  gtag: (...args: [string, string | Date | Record<string, unknown>, ...unknown[]]) => void;
}

// Declare gtag as a function
declare function gtag(
  command: string,
  param1: string | Date | Record<string, unknown>,
  ...args: unknown[]
): void;
